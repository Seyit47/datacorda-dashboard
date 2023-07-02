<script lang="ts" setup>
definePageMeta({
    middleware: [
        function (_, __) {
            return navigateTo({
                name: "analytics",
            });
        },
    ],
});
</script>

<template>
    <div></div>
</template>
