<script setup>
import { ref } from 'vue'
import CardTitle from '@components/CardTitle/CardTitle.vue'
import UploadButton from '@components/CustomButton/UploadButton.vue'
import GeneralButton from '@components/CustomButton/GeneralButton.vue'
import IconSave from '@icons/actions/IconSave.vue'
import IconPicture from '@icons/form/IconPicture.vue'
import { apiAuth } from '@src/services/api.js'
import { useToast } from 'vue-toastification'

// import Url from '@components/FormInput/Url.vue';
// const urlValue = ref("");
// const urlValidate = ref(false);
// const handlerUrl = (text, isValid) => {
//   urlValue.value = text;
//   urlValidate.value = isValid;
// };

const textButtonUpload = 'Cargar desde ordenador'
const textformat = 'Tamaño máximo: 2MB, Formatos soportados: JPG, PNG'

const toast = useToast()
const newImage = ref(null)
const currentImage = ref('https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
const isButtonEnabled = ref(false)

const handleUploadFile = (file) => {
  if (currentImage.value) {
    URL.revokeObjectURL(currentImage.value)
  }
  newImage.value = file
  currentImage.value = URL.createObjectURL(file)
  isButtonEnabled.value = true
}

const convertToBase64 = () => {
  const reader = new FileReader()
  reader.onload = (e) => {
    handleSubmit(e.target.result)
  }
  reader.readAsDataURL(newImage.value)
}

const handleSubmit = async (fileBase64) => {
  toast.info('Subiendo imagen...')
  isButtonEnabled.value = false
  try {
    await apiAuth.put({
      url: '/profile/image',
      data: { image: fileBase64 }
    })
    URL.revokeObjectURL(currentImage.value)
    currentImage.value = fileBase64
    newImage.value = null
    toast.success('Imagen guardada correctamente')
  } catch (error) {
    isButtonEnabled.value = true
    toast.error('Error al guardar imagen')
    console.error(error)
  }
}

</script>

<template>
  <div class="card card-profile">
    <CardTitle title="Foto de perfil " />
    <div class="card-content">
      <div class="upload">
        <p class="upload-title">
          <IconPicture /> Sube tu imagen
        </p>

        <div class="upload-content">
          <p class="upload-terms">
            {{ newImage ? newImage.name : textformat }}
          </p>
          <div class="upload-button">
            <UploadButton
              :text="newImage ? 'Cambiar imagen' : textButtonUpload"
              @upload-file="handleUploadFile"
            />
          </div>
        </div>
      </div>

      <div class="flex-avatar">
        <div class="user-avatar">
          <img
            :src="currentImage"
            alt="User profile image"
          >
        </div>
      </div>

      <!-- <Url @validate="handlerUrl" /> -->

      <div v-show="isButtonEnabled">
        <GeneralButton
          :icon-component="IconSave"
          text="Guardar imagen"
          @click="convertToBase64"
        />
      </div>
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
        display: flex;
        align-items: center;
        gap: 5px;
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
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>