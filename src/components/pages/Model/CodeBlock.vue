<script lang="ts" setup>
import { useToast } from "vue-toastification";

defineProps({
    model: {
        type: String,
        default: "churn",
    },
    gameId: {
        type: String,
        default: "567767bf-65e0-4c08-80fe-3e2885f8dce8",
    },
});

const $toast = useToast();

const code = ref<any>(null);

function copyToClipboard() {
    navigator.clipboard.writeText(code.value.innerText);
    $toast.success("Copied to clipboard!");
}
</script>

<template>
    <div class="w-full h-full">
        <div class="flex flex-col w-full h-full">
            <div
                class="flex items-center rounded-t-[10px] border px-5 py-2.5 bg-gradient-to-b from-[#35275E] to-[#D9D9D900]"
            >
                <span class="text-[2rem] text-white">API</span>

                <button
                    class="w-8 ml-auto text-white hover:text-cl-main transition-colors duration-150"
                    @click="copyToClipboard"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 38" fill="none">
                        <path
                            d="M20.32 3.16666H15.128C12.776 3.16666 10.912 3.16666 9.45467 3.40099C7.95333 3.64166 6.73867 4.14832 5.78133 5.28991C4.82267 6.43149 4.39733 7.88024 4.196 9.66941C4 11.4079 4 13.6293 4 16.4334V25.6769C4 28.0646 5.22667 30.1102 6.96933 30.9684C6.88 29.5276 6.88 27.5088 6.88 25.8273V17.8948C6.88 15.8666 6.88 14.117 7.03733 12.7173C7.20667 11.2163 7.588 9.77866 8.56667 8.61174C9.54533 7.44482 10.752 6.99041 12.0107 6.78774C13.184 6.60091 14.6507 6.60091 16.3533 6.60091H20.4467C22.148 6.60091 23.612 6.60091 24.7867 6.78774C24.4347 5.72116 23.8202 4.80524 23.0235 4.15934C22.2268 3.51344 21.2847 3.16752 20.32 3.16666Z"
                            fill="currentColor"
                        />
                        <path
                            d="M8.7998 18.0452C8.7998 13.7291 8.7998 11.571 9.92514 10.2299C11.0491 8.88882 12.8585 8.88882 16.4798 8.88882H20.3198C23.9398 8.88882 25.7505 8.88882 26.8758 10.2299C27.9998 11.571 27.9998 13.7291 27.9998 18.0452V25.6769C27.9998 29.9931 27.9998 32.1512 26.8758 33.4922C25.7505 34.8333 23.9398 34.8333 20.3198 34.8333H16.4798C12.8598 34.8333 11.0491 34.8333 9.92514 33.4922C8.7998 32.1512 8.7998 29.9931 8.7998 25.6769V18.0452Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </div>
            <div
                class="flex flex-col gap-y-2.5 border-l border-r border-b rounded-b-[10px] h-full overflow-hidden p-6"
            >
                <h2 class="text-[1.5rem] font-bold">Run via Shell</h2>
                <div class="whitespace-nowrap overflow-y-hidden no-scrollbar">
                    <code ref="code" class="inline-block bg-[#F2F2F2] text-black p-4">
                        curl --location 'https://api.datacorda.com/prediction/{{ model }}?game_id={{
                            gameId
                        }}&user_pseudo_id=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                    </code>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.no-scrollbar:hover {
    .no-scrollbar::-webkit-scrollbar {
        display: block;
    }
}
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
</style>
