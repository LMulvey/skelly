"use client";

import { useCallback, useState } from "react";
import { api } from "@/constants/api";

type CreateItemInput = {
	name: string;
};

export const useCreateItem = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const createItem = useCallback(async ({ name }: CreateItemInput) => {
		setIsSubmitting(true);
		setError(null);

		try {
			const response = await fetch(api.itemsUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name }),
			});

			if (!response.ok) {
				throw new Error("Failed to create item");
			}
		} catch {
			setError("Unable to create item.");
			throw new Error("Unable to create item.");
		} finally {
			setIsSubmitting(false);
		}
	}, []);

	return {
		createItem,
		isSubmitting,
		error,
	};
};
