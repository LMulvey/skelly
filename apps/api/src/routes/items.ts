import { prisma } from "@repo/db";
import {
	createItemSchema,
	itemIdParamsSchema,
	updateItemSchema,
} from "@repo/schema/item";
import { type Router as ExpressRouter, Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { invalidRequestBody, resourceNotFound } from "../utils/responseError";

export const itemsRouter: ExpressRouter = Router();

const isNotFoundError = (error: unknown): boolean => {
	if (typeof error !== "object" || error === null || !("code" in error)) {
		return false;
	}

	return (error as { code?: string }).code === "P2025";
};

itemsRouter.get(
	"/",
	asyncHandler(async (_request, response) => {
		const items = await prisma.item.findMany({
			orderBy: { createdAt: "desc" },
		});

		response.status(200).json(items);
	}),
);

itemsRouter.get(
	"/:id",
	asyncHandler(async (request, response) => {
		const paramsResult = itemIdParamsSchema.safeParse(request.params);

		if (!paramsResult.success) {
			response.status(400).json(
				invalidRequestBody({
					zodError: paramsResult.error,
				}),
			);
			return;
		}

		const item = await prisma.item.findUnique({
			where: { id: paramsResult.data.id },
		});

		if (!item) {
			response.status(404).json(resourceNotFound());
			return;
		}

		response.status(200).json(item);
	}),
);

itemsRouter.post(
	"/",
	asyncHandler(async (request, response) => {
		const bodyResult = createItemSchema.safeParse(request.body);

		if (!bodyResult.success) {
			response.status(400).json(
				invalidRequestBody({
					zodError: bodyResult.error,
				}),
			);
			return;
		}

		const item = await prisma.item.create({
			data: { name: bodyResult.data.name },
		});

		response.status(201).json(item);
	}),
);

itemsRouter.put(
	"/:id",
	asyncHandler(async (request, response) => {
		const paramsResult = itemIdParamsSchema.safeParse(request.params);

		if (!paramsResult.success) {
			response.status(400).json(
				invalidRequestBody({
					zodError: paramsResult.error,
				}),
			);
			return;
		}

		const bodyResult = updateItemSchema.safeParse(request.body);

		if (!bodyResult.success) {
			response.status(400).json(
				invalidRequestBody({
					zodError: bodyResult.error,
				}),
			);
			return;
		}

		try {
			const item = await prisma.item.update({
				where: { id: paramsResult.data.id },
				data: { name: bodyResult.data.name },
			});

			response.status(200).json(item);
		} catch (error) {
			if (isNotFoundError(error)) {
				response.status(404).json(resourceNotFound());
				return;
			}

			throw error;
		}
	}),
);

itemsRouter.delete(
	"/:id",
	asyncHandler(async (request, response) => {
		const paramsResult = itemIdParamsSchema.safeParse(request.params);

		if (!paramsResult.success) {
			response.status(400).json(
				invalidRequestBody({
					zodError: paramsResult.error,
				}),
			);
			return;
		}

		try {
			await prisma.item.delete({
				where: { id: paramsResult.data.id },
			});

			response.status(204).send();
		} catch (error) {
			if (isNotFoundError(error)) {
				response.status(404).json(resourceNotFound());
				return;
			}

			throw error;
		}
	}),
);
