<template>
    <div class="relative w-full min-h-screen">
        <header class="w-full h-19.5 p-4.75">
            <div class="w-51">
                <NuxtLink to="http://localhost:3000" :external="true">
                    <NuxtImg src="/datacorda-logo-black.png" />
                </NuxtLink>
            </div>
        </header>
        <main class="h-full bg-cl-default">
            <slot />
        </main>
    </div>
</template>
