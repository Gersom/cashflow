<script setup>
import { useRoute } from 'vue-router'
import { useUserStore } from '@stores/user';
import { storeToRefs } from 'pinia';
import {getCurrentMonthName, getCurrentYear} from '@utils/date.js'

const route = useRoute()

const month = getCurrentMonthName()
const year = getCurrentYear()


const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>

<template>
  <header class="page-header">
    <div class="header-content">
      <div class="info">
        <h1 class="page-title">{{ route.meta.title }}</h1>
        <p class="user-name">{{ user.name }}</p>
      </div>
      <div class="user-avatar">
        <img
          src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="User profile image">
      </div>
    </div>

    <div class="header-date">
      <time :datetime="Date.now()">
        <span class="month">{{ month }}</span>
        <span class="year">{{ year }}</span>
      </time>
    </div>
  </header>
</template>

<style lang="scss" scoped>

.page-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;

  .header-content {
    // height: 10vh;
    display: flex;
    gap: 25px;
    align-items: flex-start;

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .page-title {
        color: var(--primary-color);
        display: block;
        line-height: 1;
        margin: 0;
        padding: 0;
        font-size: 40px;
        font-family: var(--font-secular);
        font-weight: 400;
      }
      .user-name {
        margin: 0;
        font-size: 16px;
        font-weight: 500;
        line-height: 1.9;
        padding: 0 0.2rem;
        font-family: var(--font-poppins);
        color: var(--text-color);
      }
    }

    .user-avatar {
      position: relative;
      width: 50px;
      height: 50px;
      overflow: hidden;
      border-radius: 50%;
      border: none;
      background-color: var(--primary-color);
      box-shadow: 0px 0px 0px 0.5vh var(--primary-color);
      box-sizing: content-box;
    }
  }

  .header-date {
    color: var(--subtitle-color);
    display: flex;
    align-items: flex-start;
    font-weight:500;
    padding-top: 5px;

    .month {
      font-size: 20px;
      line-height: 20px;
      text-transform: capitalize;
      &::after {
        content: " ";
      }
    }

    .year {
      font-size: 40px;
      line-height: 40px;
    }
  }

  @media (width <= 720px) {
    .header-content {
      .info {
        .page-title {
          font-size: 30px;
        }
        .user-name {
          font-size: 16px;
        }
      }
      .user-avatar {
        width: 40px;
        height: 40px;
      }
    }
    .header-date {
      .month {
        font-size: 16px;
      }
      .year {
        font-size: 30px;
      }
    }
  }
  @media (width <= 600px) {
    .header-content {
      flex-direction: row-reverse;
      margin-left: auto;
      gap: 15px;
      .info {
        align-items: flex-end;
      }
    }
    .header-date {
      display: none;
    }
  }
}

</style>
