"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
                return;
            }

            router.push("/login");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="container mx-auto py-10 px-7 max-w-md">
            <h1 className="playfair-italic-700 text-4xl mb-2">Welcome</h1>
            <h2 className="playfair-600 text-2xl mb-8 text-primaryContent">Create an account</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="playfair text-sm uppercase text-primaryContent">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border border-bluegreen p-3 playfair focus:outline-none focus:ring-1 focus:ring-bluegreen"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="playfair text-sm uppercase text-primaryContent">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border border-bluegreen p-3 playfair focus:outline-none focus:ring-1 focus:ring-bluegreen"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="confirmPassword" className="playfair text-sm uppercase text-primaryContent">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="border border-bluegreen p-3 playfair focus:outline-none focus:ring-1 focus:ring-bluegreen"
                    />
                </div>

                {error && (
                    <p className="playfair text-sm text-red-500">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="border border-bluegreen bg-bluegreen text-white playfair-600 py-3 px-6 hover:bg-transparent hover:text-bluegreen transition-colors duration-200 disabled:opacity-50"
                >
                    {loading ? "Creating your account..." : "Create Account"}
                </button>
            </form>

            <p className="playfair text-sm text-primaryContent mt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-bluegreen underline">
                    Sign in here
                </Link>
            </p>
        </section>
    );
}
