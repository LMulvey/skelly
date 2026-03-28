"use client";

import { Button } from "@repo/ui/button";
import Link from "next/link";
import { useItems } from "./hooks/useItems";
import styles from "./page.module.css";

const LoadingSkeleton = () => {
	const skeletonIds = ["one", "two", "three"];

	return (
		<ul className={styles.itemList}>
			{skeletonIds.map((skeletonId) => (
				<li key={`skeleton-${skeletonId}`} className={styles.itemRow}>
					<div className={styles.skeletonBlock}>
						<div className={styles.skeletonTitle} />
						<div className={styles.skeletonMeta} />
					</div>
					<div className={styles.skeletonButton} />
				</li>
			))}
		</ul>
	);
};

export default function Home() {
	const { items, isLoading, error, deletingId, deleteItem, loadItems } =
		useItems();

	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.headerRow}>
					<h1 className={styles.title}>Items</h1>
					<Link href="/items/new" className={styles.linkButton}>
						<Button size="lg">New item</Button>
					</Link>
				</div>

				{error ? (
					<div className={styles.errorBox}>
						<p>{error}</p>
						<Button variant="secondary" onClick={() => void loadItems()}>
							Retry
						</Button>
					</div>
				) : null}

				{isLoading ? <LoadingSkeleton /> : null}

				{!isLoading && items.length === 0 ? (
					<p className={styles.empty}>No items yet. Create your first item.</p>
				) : null}

				<ul className={styles.itemList}>
					{items.map((item) => (
						<li key={item.id} className={styles.itemRow}>
							<div>
								<p className={styles.itemName}>{item.name}</p>
								<p className={styles.itemMeta}>
									Created {new Date(item.createdAt).toLocaleString()}
								</p>
							</div>
							<Button
								variant="destructive"
								onClick={() => void deleteItem(item.id)}
								disabled={deletingId === item.id}
							>
								{deletingId === item.id ? "Deleting..." : "Delete"}
							</Button>
						</li>
					))}
				</ul>
			</main>
		</div>
	);
}
