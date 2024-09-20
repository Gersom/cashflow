<script setup>
import TransactionBadge from '@app-page/components/TransactionBadge.vue';
import IconEdit from '@icons/actions/IconEdit.vue';
import { computed } from 'vue';
import BookmarkTag from './components/BookmarkTag.vue';

const emit = defineEmits(["on-edit"]);
const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      createdAt:"2024-09-15T00:02:51.385Z"
    })
  },
});

const isoDate = computed(() => {
  const dateTemp = new Date(props.data?.createdAt)
  return dateTemp.toISOString().split('T')[0]
});

const formattedDate = computed(() => {
  const dateTemp = new Date(props.data?.createdAt)
  return dateTemp.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
  }).replace(/\//g, ' / ');
});
</script>

<template>
  <div class="movement-card">
    <div class="bookmarks">
      <BookmarkTag
        v-for="(bookmark, index) in props.data?.categories?.slice(0, 3)"
        :key="bookmark.id + index"
        :data="bookmark"
        :index-item="index"
      />
    </div>
    <div class="info-tag-wrapper">
      <div class="info-tag">
        <div class="content">
          <div class="description">
            <p class="details-text">{{ props.data?.title }}</p>
          </div>
          <div class="badge-info">
            <time :datetime="isoDate" class="date">
              {{ formattedDate }}
            </time>
            <TransactionBadge
              :amount="parseFloat(props.data?.amount) || 0"
              :isPositive="props.data?.type === 'income'"
            />
          </div>
        </div>
        <button
          class="edit-button"
          @click="emit('on-edit')"
        >
          <div class="edit-hover">
            <div class="icon">
              <IconEdit />
            </div>
            <div class="edit-text">
              <p class="name">Editar</p>
              <p class="description">{{ props.data?.title }}</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movement-card {
  .bookmarks {
    display: flex;
    gap: 3px;
  }

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
        background-color: var(--background-color2);
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
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      background: var(--primary-color);

      .edit-hover {
        display: flex;
        align-items: center;
        color: var(--title-color);
        font-family: var(--font-nunito);
        gap: 4px;

        .icon {
          width: 24px;
          height: 24px;
        }

        .edit-text {
          height: 56px;
          display: flex;
          flex-direction: column;
          padding: 13px 0;

          .name {
            height: auto;
            margin: 0;
            text-align: left;
            font-size: 16px;
            font-weight: 400;
            line-height: 1;
          }

          .description {
            margin: 0;
            text-align: left;
            font-size: 14px;
            line-height: 1.1;
            width: 100%;
          }
        }
      }
    }

    &:hover {
      .edit-button {
        opacity: 1;
      }
    }
  }
}
</style>
