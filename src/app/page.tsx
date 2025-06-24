import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const secrets = await api.secret.getAll();

  return (
    <HydrateClient>
      <p>Hello</p>
      {secrets.map((secret) => (
        <p key={secret.id}>{secret.content}</p>
      ))}
    </HydrateClient>
  );
}
