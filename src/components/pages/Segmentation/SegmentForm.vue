<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import ModalSegmentation from "./ModalSegmentation/Wrapper.vue";
import BaseSelect from "@/components/core/base/BaseSelect.vue";
import BaseDatePicker from "@/components/core/base/BaseDatePicker.vue";
import { useAuthStore } from "@/store/auth";
import { truncateValue } from "@/utils/index";

const props = defineProps({
    instance: {
        type: [Object, null] as PropType<any>,
        required: true,
    },
});

const { instance } = toRefs(props);

const filter = reactive<any>({
    model: null,
    size: 2,
    range: null,
});

watch(instance, () => {
    if (!instance.value) {
        segmentList.value = [];
        filter.size = 2;
        fetchSegmentOrder();
        return;
    }
    segmentList.value = [];
    filter.size = instance.value.size;
    fetchSegmentOrder();
});

const $toast = useToast();

const modal = ref<any>(null);

const isLoading = ref(false);

const segmentList = ref<any[]>([]);
const segmentNameInput = ref<HTMLInputElement[]>([]);
const modelList = ref<any[]>([]);
const colors = [
    [1, 10],
    [1, 5, 10],
    [1, 4, 7, 10],
    [1, 3, 6, 8, 10],
    [1, 2, 4, 6, 8, 10],
    [1, 2, 4, 6, 8, 9, 10],
    [1, 2, 3, 4, 6, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
];

const currentSegmentIndex = ref();

const emit = defineEmits(["refresh"]);

watch(
    filter,
    () => {
        fetchSegmentOrder();
    },
    {
        deep: true,
    }
);

const { $config } = useNuxtApp();

const authStore = useAuthStore();
const { accessToken } = storeToRefs(authStore);

async function fetchModelList() {
    const response = await $fetch(
        `
        ${$config.public.BACKEND_URL}/game/models/567767bf-65e0-4c08-80fe-3e2885f8dce8`,
        {
            method: "GET",
            headers: {
                authorization: `Bearer ${accessToken.value}`,
            },
        }
    );

    modelList.value = response as any[];
    filter.model = modelList.value[0];
}

async function fetchSegmentOrder() {
    isLoading.value = true;
    try {
        const query = new URLSearchParams();

        if (filter.model) {
            query.append("model", filter.model);
        }

        if (filter.size) {
            query.append("size", filter.size);
        }

        if (filter.range) {
            query.append("start", filter.range[0]);
            query.append("end", filter.range[1]);
        }

        const response = await $fetch(
            `${$config.public.BACKEND_URL}/prediction/analytics/${
                filter.model
            }?game_id=567767bf-65e0-4c08-80fe-3e2885f8dce8&${query.toString()}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        );

        if (instance.value) {
            segmentList.value = (response as any[]).reduce((acc, curValue, curIndex) => {
                const segment = {
                    name:
                        segmentList.value[curIndex] && segmentList.value[curIndex].name
                            ? segmentList.value[curIndex].name
                            : instance.value[`s${curIndex + 1}`]
                            ? instance.value[`s${curIndex + 1}`]
                            : `Segment ${curIndex + 1}`,
                    user_number: curValue.user_number,
                };

                return [...acc, segment];
            }, []);
            return;
        }

        segmentList.value = (response as any[]).reduce((acc, curValue, curIndex) => {
            const segment = {
                name:
                    segmentList.value[curIndex] && segmentList.value[curIndex].name
                        ? segmentList.value[curIndex].name
                        : `Segment ${curIndex + 1}`,
                user_number: curValue.user_number,
            };
            return [...acc, segment];
        }, []);
    } catch (error: any) {
        $toast.error(error.response.message);
    } finally {
        isLoading.value = false;
    }
}

async function submitForm() {
    try {
        const { isSubmit, data } = await modal.value.open(instance.value);
        if (!isSubmit) {
            return;
        }
        const formData = new FormData();

        formData.append("segmentation_name", data);
        formData.append("model", filter.model);
        formData.append("game_id", "567767bf-65e0-4c08-80fe-3e2885f8dce8");
        formData.append("segments", JSON.stringify(segmentList.value.map((item) => item.name)));

        let url = "/segmentation/create";
        let message = "Segmentation created successfully!";

        if (instance.value) {
            url = `/segmentation/${instance.value.id}`;
            message = "Segmentation updated successfully!";
        }

        await $fetch(`${$config.public.BACKEND_URL}${url}`, {
            method: instance.value ? "PUT" : "POST",
            headers: {
                authorization: `Bearer ${accessToken.value}`,
            },
            body: formData,
        });

        $toast.success(message);
        emit("refresh");
        segmentList.value = [];
        filter.size = 2;
        await fetchSegmentOrder();
    } catch (error: any) {
        $toast.error(error.message);
    }
}

function onSelect(index: number) {
    segmentNameInput.value[index].disabled = false;
    segmentNameInput.value[index].select();
    currentSegmentIndex.value = index;
}

function onSave(index: number) {
    if (segmentList.value[index].name.length > 0) {
        currentSegmentIndex.value = undefined;
        return;
    }
    $toast.error("Segment name must be at least 1 character long!");
}

function onDelete(index: number) {
    if (segmentList.value.length === 2) {
        $toast.error("Segmentations must contain at least 2 segments!");
        return;
    }
    segmentList.value.splice(index, 1);
    filter.size -= 1;
}

await fetchModelList();
</script>

<template>
    <div class="flex flex-col gap-y-7.5">
        <form @submit.prevent="submitForm">
            <div class="flex items-center gap-x-7.5">
                <div class="w-42">
                    <BaseSelect v-model="filter.model" :list="modelList" placeholder="Model" />
                </div>
                <div class="w-42">
                    <BaseDatePicker
                        v-model="filter.range"
                        :item-name="(item:string[]) => `${item[0]}/${item[1]}`"
                        placeholder="Date Range"
                        range
                    />
                </div>

                <div class="w-34 ml-auto">
                    <button
                        type="submit"
                        class="flex justify-center items-center w-full rounded-full text-white font-bold py-2 border border-cl-main bg-cl-main hover:bg-white hover:text-cl-main transition-colors duration-150"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>

        <div class="flex flex-col gap-y-7.5 w-full">
            <div v-if="instance">
                <h2
                    class="text-[1.5rem] text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                >
                    <b>Segmentation name:</b> {{ instance.segmentation_name }}
                </h2>
            </div>
            <div
                v-for="(item, index) in segmentList"
                :key="index"
                class="flex items-center py-4 px-6 rounded-[10px]"
                :class="{
                    'bg-gradient-to-b from-[#FF4C00] to-[#FFFFFF]':
                        colors[filter.size - 2][index] === 1,
                    'bg-gradient-to-b from-[#DB6107] to-[#D9D9D900]':
                        colors[filter.size - 2][index] === 2,
                    'bg-gradient-to-b from-[#B3780F] to-[#D9D9D900]':
                        colors[filter.size - 2][index] === 3,
                    'bg-gradient-to-b from-[#978815] to-[#D9D9D900]':
                        colors[filter.size - 2][index] === 4,
                    'bg-gradient-to-b from-[#988715] to-[#D9D9D900]':
                        colors[filter.size - 2][index] === 5,
                    'bg-gradient-to-b from-[#80951A] to-[#80951A00]':
                        colors[filter.size - 2][index] === 6,
                    'bg-gradient-to-b from-[#779A1C] to-[#D9D9D900]':
                        colors[filter.size - 2][index] === 7,
                    'bg-gradient-to-b from-[#68A31F] to-[#D9D9D900]':
                        colors[filter.size - 2][index] === 8,
                    'bg-gradient-to-b from-[#53AF23] to-[#53AF2300]':
                        colors[filter.size - 2][index] === 9,
                    'bg-gradient-to-b from-[#2EC52B] to-[#D9D9D900]':
                        colors[filter.size - 2][index] === 10,
                }"
            >
                <div class="flex items-center gap-x-2.5">
                    <div class="w-[40%]">
                        <input
                            ref="segmentNameInput"
                            v-model="item.name"
                            type="text"
                            :disabled="currentSegmentIndex !== index"
                            class="relative w-full text-[1.5rem] text-white font-bold bg-transparent focus:outline-white"
                            :class="{
                                'z-[9999]': currentSegmentIndex === index,
                            }"
                        />
                        <div
                            v-if="currentSegmentIndex === index"
                            class="fixed top-0 left-0 w-full h-full z-[9990]"
                            @click.self.prevent="onSave(index)"
                        ></div>
                    </div>
                    <div class="w-[60%] flex items-center gap-x-2.5">
                        <button
                            v-if="currentSegmentIndex !== index"
                            class="w-6 text-white"
                            @click="onSelect(index)"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 22" fill="none">
                                <path
                                    d="M19.0454 0.150878C19.0953 0.103051 19.1546 0.0651069 19.2198 0.0392168C19.2851 0.0133268 19.355 0 19.4256 0C19.4963 0 19.5662 0.0133268 19.6315 0.0392168C19.6967 0.0651069 19.756 0.103051 19.8059 0.150878L22.8433 3.05763C22.9437 3.1539 23 3.28428 23 3.42021C23 3.55613 22.9437 3.68652 22.8433 3.78278L5.02895 20.8227C4.96102 20.8871 4.87655 20.9331 4.78406 20.9563L0.67256 21.9834C0.581931 22.006 0.486694 22.0055 0.396305 21.9821C0.305917 21.9586 0.223521 21.9129 0.157292 21.8496C0.0910641 21.7862 0.0433086 21.7075 0.0187656 21.621C-0.00577726 21.5346 -0.00625429 21.4435 0.0173828 21.3568L1.09144 17.425C1.11535 17.3365 1.16355 17.2556 1.23107 17.1908L19.0454 0.150878Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                        <button
                            v-else
                            class="relative w-7.5 text-white"
                            :class="{
                                'z-[9999]': currentSegmentIndex === index,
                            }"
                            @click="onSave(index)"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path
                                    d="M15 9H5V5h10m-3 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3a3 3 0 0 1 3 3a3 3 0 0 1-3 3m5-16H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-4-4Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                        <button class="w-8.5 text-white" @click="onDelete(index)">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 37" fill="none">
                                <path
                                    d="M9.99992 29.2917C9.99992 30.9875 11.4999 32.375 13.3333 32.375H26.6666C28.4999 32.375 29.9999 30.9875 29.9999 29.2917V13.875C29.9999 12.1792 28.4999 10.7917 26.6666 10.7917H13.3333C11.4999 10.7917 9.99992 12.1792 9.99992 13.875V29.2917ZM29.9999 6.16667H25.8333L24.6499 5.07208C24.3499 4.79458 23.9166 4.625 23.4833 4.625H16.5166C16.0833 4.625 15.6499 4.79458 15.3499 5.07208L14.1666 6.16667H9.99992C9.08325 6.16667 8.33325 6.86042 8.33325 7.70833C8.33325 8.55625 9.08325 9.25 9.99992 9.25H29.9999C30.9166 9.25 31.6666 8.55625 31.6666 7.70833C31.6666 6.86042 30.9166 6.16667 29.9999 6.16667Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="flex items-center ml-auto">
                    <div class="pr-2.5 text-[1.5rem] text-white">
                        {{ Math.round(100 - (100 / filter.size) * (index + 1)) }}-{{
                            Math.round((100 / filter.size) * (filter.size - index))
                        }}%
                    </div>
                    <div class="flex items-center text-[1.5rem] border-l pl-2.5 text-white">
                        <div class="w-5.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 23" fill="none">
                                <path
                                    d="M10.9999 3.83337C10.0275 3.83337 9.09483 4.23724 8.40719 4.95613C7.71956 5.67502 7.33325 6.65004 7.33325 7.66671C7.33325 8.68337 7.71956 9.65839 8.40719 10.3773C9.09483 11.0962 10.0275 11.5 10.9999 11.5C11.9724 11.5 12.905 11.0962 13.5926 10.3773C14.2803 9.65839 14.6666 8.68337 14.6666 7.66671C14.6666 6.65004 14.2803 5.67502 13.5926 4.95613C12.905 4.23724 11.9724 3.83337 10.9999 3.83337ZM10.9999 19.1667C10.9999 19.1667 3.66659 19.1667 3.66659 17.25C3.66659 14.95 7.24159 12.4584 10.9999 12.4584C14.7583 12.4584 18.3333 14.95 18.3333 17.25C18.3333 19.1667 10.9999 19.1667 10.9999 19.1667Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                        {{ truncateValue(item.user_number) }}
                    </div>
                </div>
            </div>

            <button
                v-if="filter.size < 10"
                class="flex justify-center items-center border rounded-[10px] py-2"
                :disabled="isLoading"
                @click="filter.size += 1"
            >
                <span class="text-[2rem] text-cl-gray font-bold">+</span>
            </button>
        </div>
        <ModalSegmentation ref="modal" />
    </div>
</template>
