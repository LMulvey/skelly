"use client";

import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { useCreateItem } from "../../hooks/useCreateItem";
import styles from "./page.module.css";

export default function NewItemPage() {
	const router = useRouter();
	const [name, setName] = useState("");
	const { createItem, isSubmitting, error } = useCreateItem();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const trimmedName = name.trim();

		if (!trimmedName) {
			return;
		}

		try {
			await createItem({ name: trimmedName });
			router.push("/");
			router.refresh();
		} catch {
			return;
		}
	};

	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.headerRow}>
					<h1 className={styles.title}>Create item</h1>
					<Link href="/" className={styles.linkButton}>
						<Button variant="secondary">Back to list</Button>
					</Link>
				</div>

				<form
					className={styles.form}
					onSubmit={(event) => void handleSubmit(event)}
				>
					<label className={styles.label} htmlFor="name">
						Name
					</label>
					<Input
						id="name"
						name="name"
						value={name}
						onChange={(event) => setName(event.target.value)}
						placeholder="Item name"
						required
					/>

					{error ? <p className={styles.error}>{error}</p> : null}

					<Button
						type="submit"
						disabled={isSubmitting || name.trim().length === 0}
					>
						{isSubmitting ? "Creating..." : "Create item"}
					</Button>
				</form>
			</main>
		</div>
	);
}
