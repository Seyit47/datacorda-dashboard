<template>
    <div class="relative w-full min-h-screen">
        <header class="w-full h-19.5 p-4.75">
            <div class="w-51">
                <NuxtLink :to="`${$config.public.LANDING_PAGE_URL}`" :external="true">
                    <img src="@/assets/img/datacorda-logo-black.png" alt="Datacorda logo" />
                </NuxtLink>
            </div>
        </header>
        <div class="h-full">
            <slot />
        </div>
    </div>
</template>
