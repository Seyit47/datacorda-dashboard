import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
    async scrollBehavior(to, from, savedPosition) {
        if (from.name === "index" && to.name === "index" && to.hash) {
            return {
                top: 82,
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
            await new Promise<void>((resolve) => {
                const handler = () => {
                    resolve();
                };
                app.hook("page:finish", handler);
            });

            return {
                top: 82,
                el: to.hash,
                behavior: "smooth",
            };
        }

        return savedPosition || { left: 0, top: 0 };
    },
};
