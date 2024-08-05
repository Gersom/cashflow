<script setup>
import TransactionBadge from '@components/TransactionBadge/TransactionBadge.vue';
import { computed } from 'vue';
import BookmarkTag from './components/BookmarkTag.vue';

const emit = defineEmits(["click"]);
const props = defineProps({
    date: {
        type: Date,
        required: true
    },
    text: {
        type: String,
        default: "Honorarios trabajo del centro de la ciudad ",
    },
});

const isoDate = computed(() => props.date.toISOString().split('T')[0]);

const formattedDate = computed(() => {
    return props.date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).replace(/\//g, ' / ');
});
</script>

<template>
    
    <div class="bookmarks">
       <BookmarkTag/>
       <BookmarkTag/>
    </div>
    <div class="info-tag-wrapper">
        <div class="info-tag">
            <div class="content">
                <div class="description">
                    <p class="details-text">{{ props.text }}</p>
                </div>
                <div class="badge-info">
                    <time :datetime="isoDate" class="date">{{ formattedDate }}</time>
                    <TransactionBadge :amount="1000.00" :isPositive="true" />
                </div>
            </div>
            <button class="edit-button">
                text
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.info-tag-wrapper {
    position: relative;
    height: 56px;
    width: 100%;
    
    .info-tag {
        position: relative;
        height: 100%;
        width: 100%;
        background-color: var(--background-color-2);
        
        .content {
            border-radius: var(--border-radius);
            border: 2px solid var(--background-color);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 100%;
            display: flex;
            justify-content: space-between;
            padding: 10px;
            background-color: var(--background-color2);;
            transition: opacity .3s ease;
            z-index: 2;
        }

        .description {
            flex-grow: 2;
            width: 40%;

            .details-text {
                color: var(--text-color);
                font-size: 14px;
                font-family: var(--font-poppins);
                font-weight: 400;
                line-height: 1.2;
                margin: 0;
                text-align: left;
            }
        }

        .badge-info {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;

            .date {
                margin: 0;
                display: flex;
                flex-direction: row-reverse;
                font-size: 10px;
                color: var(--subtitle-color);
                font-weight: 400;
                font-family: var(--font-secular);
            }
        }

    }

    .edit-button {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 2;
    }

    &:hover {
        .edit-button {
            opacity: 1;
        }
    }
}

.bookmarks{
    display: flex;
    gap: 3px;
}
</style>
