<template>
    <div class="lds-ring relative w-full h-full">
        <div class="w-full h-full"></div>
        <div class="w-full h-full"></div>
        <div class="w-full h-full"></div>
        <div class="w-full h-full"></div>
    </div>
</template>

<style lang="scss" scoped>
.lds-ring div {
    position: absolute;
    border: 8px solid #35275e;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #35275e transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}
@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
