import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
    async scrollBehavior(to, from, savedPosition) {
        if (from.name === to.name && to.hash) {
            return {
                top: 66,
                el: to.hash,
                behavior: "smooth",
            };
        }

        const app = useNuxtApp();

        await new Promise<void>((resolve) => {
            const handler = () => {
                resolve();
            };
            app.hook("page:finish", handler);
        });

        if (to.hash) {
            return {
                top: 66,
                el: to.hash,
                behavior: "smooth",
            };
        }

        return savedPosition || { left: 0, top: 0 };
    },
};
