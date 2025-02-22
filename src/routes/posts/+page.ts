import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    try {
        const modules = import.meta.glob("../../lib/content/posts/*.md");

        const posts = await Promise.all(
            Object.entries(modules).map(async ([path, resolver]) => {
                const post = await resolver();
                const slug = path.split("/").pop()?.replace(".md", "");
                return {
                    ...post.metadata,
                    slug,
                };
            }),
        );

        return { posts };
    } catch (err) {
        throw new Error(`Failed to load posts: ${err}`);
    }
};
