<template>
  <a-form-item :label="label" :validate-status="status" :help="errorMessage">
    <a-upload-dragger
      v-bind="uploadProps"
      v-model:file-list="fileList"
      :before-upload="beforeUpload"
      :max-count="isSingle ? 1 : undefined"
      :multiple="!isSingle"
      @change="handleChange"
      :type="type"
      list-type="picture-card"
      @preview="handlePreview"
    >
      <p class="ant-upload-drag-icon"><component :is="useIcon('InboxOutlined')" /></p>
      <p class="ant-upload-text">Click or drag file to this area to upload</p>
      <p class="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </a-upload-dragger>
  </a-form-item>

  <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
    <img alt="example" style="width: 100%" :src="previewImage" />
  </a-modal>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useField } from 'vee-validate';
import type { UploadProps } from 'ant-design-vue';
import { Upload } from 'ant-design-vue';
import { useIcon } from '@/components/Icons';

defineOptions({ name: 'Upload' });

interface Props {
  name: string;
  label?: string;
  modelValue?: any;
  buttonText?: string;
  uploadProps?: UploadProps | any;
  type?: 'single' | 'multiple' | any;
}

const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');

const props = withDefaults(defineProps<Props>(), {
  label: '',
  modelValue: () => [],
  buttonText: 'Click to Upload',
  uploadProps: () => ({}),
  type: 'multiple',
});

const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};
const handlePreview = async (file: any) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string;
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: any[]): void;
}>();

const { value, errorMessage } = useField<any[]>(props.name, undefined, {
  validateOnValueUpdate: true,
});

const fileList = ref<any[]>(props.modelValue);

const status = computed(() => (errorMessage.value ? 'error' : ''));

const isSingle = computed(() => props.type === 'single');

watch(
  () => props.modelValue,
  val => {
    if (val !== fileList.value) {
      fileList.value = val || [];
    }
  },
  { immediate: true },
);

watch(fileList, val => {
  value.value = val;
  emit('update:modelValue', val);
});

function beforeUpload(file: File) {
  const isValidType = ['image/png', 'image/jpeg', 'image/svg+xml'].includes(file.type);
  if (!isValidType) {
    errorMessage.value = 'Faqat PNG, JPG yoki SVG yuklash mumkin!';
    return Upload.LIST_IGNORE;
  }

  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    errorMessage.value = 'Fayl hajmi 10MB dan kichik bo‘lishi kerak!';
    return Upload.LIST_IGNORE;
  }

  errorMessage.value = '';
  return false;
}

function handleChange(info: any) {
  fileList.value = info.fileList;
}

watch(
  () => props.modelValue,
  val => {
    if (!Array.isArray(val)) {
      fileList.value = [];
    } else if (val !== fileList.value) {
      fileList.value = val;
    }
  },
  { immediate: true },
);

watch(fileList, val => {
  const safeVal = Array.isArray(val) ? val : [];
  value.value = safeVal;
  emit('update:modelValue', safeVal);
});
</script>
