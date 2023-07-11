import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
    async scrollBehavior(_, __, savedPosition) {
        const app = useNuxtApp();

        await new Promise<void>((resolve) => {
            const handler = () => {
                resolve();
            };
            app.hook("page:finish", handler);
        });

        return savedPosition || { left: 0, top: 0 };
    },
};
