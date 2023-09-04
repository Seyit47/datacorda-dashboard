<script lang="ts" setup>
import BaseMaxContent from "@/components/core/base/BaseMaxContent.vue";
import BaseDocumentViewer from "@/components/core/base/BaseDocumentViewer.vue";

definePageMeta({
    layout: "documentation",
});

const content =
    ref(`<p id="what-is-datacorda" class="c5"><span class="c1">What is Datacorda?</span></p>
    <p class="c3"><span class="c11 c12"></span></p>
    <p class="c5">
      <span class="c11 c12"
        >Datacorda is an AI-powered analytics and prediction platform designed
        for mobile game developers. It offers a range of features and tools to
        help developers understand their players, increase retention, and
        maximise revenue. This documentation will provide an in-depth
        understanding of Datacorda and its capabilities.</span
      >
    </p>
    <p class="c5 c26">
      <span class="c17 c12 c22">Deep Analytics</span
      ><span class="c12 c22">:</span
      ><span class="c11 c12"
        >&nbsp;Gain insights into player behaviour and game metrics.</span
      >
    </p>
    <p class="c5 c8">
      <span class="c17 c12 c22">User-based Game Optimization</span
      ><span class="c12 c17">:</span
      ><span class="c11 c12"
        >&nbsp;Utilise machine learning to predict player &nbsp;
        behaviours.</span
      >
    </p>
    <p class="c5 c26">
      <span class="c17 c12 c22">Increase Retention:</span
      ><span class="c11 c12"
        >&nbsp;Identify and address churn-related issues.</span
      >
    </p>
    <p class="c5 c26">
      <span class="c17 c12 c22">Increase Revenue:</span
      ><span class="c17 c12">&nbsp;</span
      ><span class="c12">Implement segmented monetization strategies.</span
      ><span class="c2"
        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
      >
    </p>
    <p class="c5">
      <span class="c2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </p>
    <p id="why-datacorda" class="c5"><span class="c1">Why Datacorda?</span></p>
    <p class="c5">
      <span class="c2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </p>
    <p class="c5"><span class="c9 c15">The Importance of Player Data</span></p>
    <p class="c5">
      <span class="c11 c9"
        >In the highly competitive mobile gaming industry, success depends on
        knowing your players well enough. Datacorda is your solution to extract
        valuable insights from player data, helping you make informed decisions
        that lead to game growth.</span
      >
    </p>
    <p class="c3"><span class="c11 c9"></span></p>
    <p class="c5"><span class="c15 c9">Addressing Churn</span></p>
    <p class="c5">
      <span class="c11 c9"
        >Churn is a significant challenge in the mobile game businesses.
        Datacorda equips you with the tools to find the reasons behind player
        churn and take right actions to reduce it. By understanding why players
        leave, you can make data-driven adjustments to improve player
        retention.</span
      >
    </p>
    <p class="c3"><span class="c9 c11"></span></p>
    <p class="c5">
      <span class="c15 c9">Personalized Player Experiences</span>
    </p>
    <p class="c5">
      <span class="c11 c9"
        >Traditional A/B testing and optimization methods are limited. Datacorda
        goes beyond by using advanced machine learning algorithms to predict
        player behaviors from the moment they start playing your game. This
        enables you to tailor experiences to individual players and boost player
        engagement.</span
      >
    </p>
    <p class="c3"><span class="c11 c9"></span></p>
    <p class="c5"><span class="c15 c9">Maximizing Revenue</span></p>
    <p class="c5">
      <span class="c11 c9"
        >Not all players have the same spending habits. Datacorda helps you
        identify low-value and high-value players, allowing you to customize
        in-game offerings and promotions to specific player segments. This
        tailored approach can significantly increase player lifetime value (LTV)
        and boost your game&#39;s revenue.</span
      >
    </p>
    <p class="c3"><span class="c11 c9"></span></p>
    <p class="c5">
      <span class="c2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </p>
    <p id="how-datacorda-works" class="c5"><span class="c1">How Datacorda works?</span></p>
    <p class="c3"><span class="c1"></span></p>
    <p class="c5"><span class="c15 c9">Data collection</span></p>
    <p class="c5">
      <span class="c9"
        >Datacorda simplifies the data collection process for your mobile game.
        Using our event design taxonomy, you can effortlessly store your data by
        following the step-by-step guide in our </span
      ><span class="c6">integration part</span
      ><span class="c11 c9"
        >. Once integrated, Datacorda takes care of data cleaning, analytics,
        and engineering, saving you valuable time and effort.</span
      >
    </p>
    <p class="c3"><span class="c15 c9"></span></p>
    <p class="c5"><span class="c19 c9">Machine Learning</span></p>
    <p class="c5">
      <span class="c11 c9"
        >After successfully setting up the data connection, Datacorda&#39;s
        machine learning capabilities come into play. Our self-learning AI
        models start to analyze player behavior comprehensively. This analysis
        empowers Datacorda to predict players&#39; next moves, a crucial step in
        making informed decisions to enhance your game metrics.</span
      >
    </p>
    <p class="c3"><span class="c11 c9"></span></p>
    <p class="c5"><span class="c9 c19">Analytics Section</span></p>
    <p class="c5">
      <span class="c9"
        >Datacorda offers user-friendly and accessible dashboards that provide
        deep insights into your game&#39;s performance. These dashboards present
        comprehensive graphics and funnels, allowing you to gain a clear
        understanding of your game&#39;s performance. With this information, you
        can understand the logic behind players&#39; actions, enabling you to
        optimize player engagement effectively.</span
      >
    </p>
    <p class="c3"><span class="c15 c9"></span></p>
    <p class="c5"><span class="c15 c9">AI Section</span></p>
    <p class="c5">
      <span class="c9"
        >Datacorda&#39;s ready-to-use prediction results categorize players into
        segments based on their behavior. These segments serve as a valuable
        resource for your game optimization efforts. You can easily integrate
        these prediction results to make informed decisions regarding
        advertising pressure and game difficulty. Moreover, Datacorda enables
        you to take player-specific and behavior-specific actions to scale up
        your game and enhance player satisfaction.</span
      >
    </p>`);
</script>

<template>
    <div class="w-full">
        <BaseMaxContent class="max-w-[76rem] px-6 py-8.75">
            <div class="flex flex-col gap-y-7.5 h-full">
                <div class="flex items-center">
                    <h2 class="text-[2.5rem] text-cl-main font-bold">Introduction</h2>
                </div>

                <BaseDocumentViewer :content="content" />
            </div>
        </BaseMaxContent>
    </div>
</template>
