<script setup>
import { ref, computed} from 'vue'
import CardTitle from '@components/CardTitle/CardTitle.vue'
import UploadButton from "@components/CustomButton/UploadButton.vue"
import GeneralButton from "@components/CustomButton/GeneralButton.vue"
import IconSave from '@icons/actions/IconSave.vue';
import IconPicture from '@icons/form/IconPicture.vue';
import Url from '@components/FormInput/Url.vue';

const urlValue = ref("");
const urlValidate = ref(false);
const handlerUrl = (text, isValid) => {
  urlValue.value = text;
  urlValidate.value = isValid;
};

const isButtonEnabled = computed(() => {
  return urlValidate.value;
});

</script>

<template>
  <div class="card card-profile">
    <CardTitle title="Foto de perfil "/>
    <div class="card-content">

        <div class="upload">
            <p class="upload-title">
              <IconPicture/> Sube tu imagen</p>

            <div class="upload-content">
              <p  class="upload-terms">
                Tamaño máximo: 2MB, Formatos soportados: JPG, PNG
              </p>
              <div class="upload-button">
                <UploadButton text="Cargar desde ordenador" />
              </div>
            </div>
        </div>
        <Url @validate="handlerUrl" />
        <div class="flex-avatar">
          <div class="user-avatar">
            <img
              src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="User profile image">
          </div>
        </div>
        <GeneralButton
          :disabled="!isButtonEnabled"
          :icon-component="IconSave"
          text="Guardar imagen"
        />
        
      </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
  height: 100%;
  width: 100%;

  .card-content {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .upload{
      display: flex;
      flex-direction: column;
      gap:15px;
      .upload-title{
        height: 14px;
        color: var(--text-color);
        font-size: 14px;
        margin: 0;
      }
      .upload-content{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        .upload-terms{
          color: var(--text-color);
          font-size: 14px;
          margin: 0;
          max-width: 200px;
          text-align: center
        }
        .upload-button{
          display: flex;
          justify-content: center;
        }
      }
      .upload-button{
        display: flex;
        justify-content: center;
      }
    }

    .flex-avatar{
      display: flex;
      padding: 25px 0 25px 0;
      justify-content: center;
      .user-avatar {
        position: relative;
        width: 100px;
        height: 100px;
        overflow: hidden;
        border-radius: 50%;
        border: none;
        background-color: var(--title-color);
        box-shadow: 0px 0px 0px 0.5vh var(--title-color);
      }
    }
  }
}
</style>