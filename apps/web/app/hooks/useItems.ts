"use client";

import type { Item } from "@repo/db";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/constants/api";

export const useItems = () => {
	const [items, setItems] = useState<Item[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const loadItems = useCallback(async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(api.itemsUrl, {
				method: "GET",
			});

			if (!response.ok) {
				throw new Error("Failed to load items");
			}

			const data = (await response.json()) as Item[];
			setItems(data);
		} catch {
			setError("Unable to load items right now.");
		} finally {
			setIsLoading(false);
		}
	}, []);

	const deleteItem = useCallback(async (id: string) => {
		setDeletingId(id);
		setError(null);

		try {
			const response = await fetch(`${api.itemsUrl}/${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Failed to delete item");
			}

			setItems((currentItems) => currentItems.filter((item) => item.id !== id));
		} catch {
			setError("Unable to delete this item.");
		} finally {
			setDeletingId(null);
		}
	}, []);

	useEffect(() => {
		void loadItems();
	}, [loadItems]);

	return {
		items,
		isLoading,
		error,
		deletingId,
		loadItems,
		deleteItem,
	};
};
