import { error } from "@sveltejs/kit";
import type { PageData } from "./$types";

export const load: PageData = async ({ params }) => {
    try {
        const post = await import(
            `../../../lib/content/posts/${params.post}.md`
        );

        return {
            PostContent: post.default,
            meta: { ...post.metadata, slug: params.post },
        };
    } catch (err) {
        error(404, err);
    }
};
