<template>
  <a-tree
    :tree-data="treeData"
    :selected-keys="selectedKeys"
    :checked-keys="checkedKeys"
    :expanded-keys="expandedKeys"
    :checkable="checkable"
    @select="handleSelect"
    @check="handleCheck"
    @expand="handleExpand"
  />
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

defineOptions({ name: 'Tree' });

interface TreeNode {
  key: string;
  title: string;
  children?: TreeNode[];
  selectable?: boolean;
  disabled?: boolean;
}

interface Props {
  treeData: TreeNode[];
  checkable?: boolean;
  defaultSelectedKeys?: string[] | any;
  defaultCheckedKeys?: string[] | any;
  defaultExpandedKeys?: string[] | any;
}

const props = withDefaults(defineProps<Props>(), {
  checkable: false,
  defaultSelectedKeys: [],
  defaultCheckedKeys: [],
  defaultExpandedKeys: [],
});

const selectedKeys = ref(props.defaultSelectedKeys);
const checkedKeys = ref(props.defaultCheckedKeys);
const expandedKeys = ref(props.defaultExpandedKeys);

function handleSelect(selectedKeysValue: any) {
  selectedKeys.value = selectedKeysValue;
}

function handleCheck(checkedKeysValue: any) {
  checkedKeys.value = checkedKeysValue;
}

function handleExpand(expandedKeysValue: any) {
  expandedKeys.value = expandedKeysValue;
}
</script>
