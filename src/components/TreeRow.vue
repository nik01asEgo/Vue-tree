<template>
  <div class="tree-item">
    <div class="tree-item-title">
      <input
        type="checkbox"
        class="select-checkbox"
        :modelValue="row.selected"
        @change="(e) => $emit('select', row)"
      />
      <div
        v-if="childrenable"
        class="arrow"
        :class="{ active: isShow }"
        @click="isShow = !isShow"
      >
        &#5125;
      </div>
      <div v-else class="arrow-empty" />
      <a :href="`https://www.klerk.ru${row.url}`" target="_blank">
        {{ row.title }} ({{ row.count }})
      </a>
    </div>
    <div v-if="isShow && childrenable" class="tree-item-children">
      <TreeRow
        v-for="rowChildren in row.children"
        :key="rowChildren.id"
        :row="rowChildren"
        @select="(childRow) => $emit('select', childRow)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TreeRow",
  props: {
    row: Object,
  },
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    childrenable() {
      return this.row.children && this.row.children.length;
    },
  },
  methods: {},
  beforeMount() {},
};
</script>

<style>
.tree-item {
}

.tree-item-title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.tree-item-children {
  padding-left: 15px;
}

.arrow {
  font-size: 20px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: transform linear 0.1s;
}

.arrow.active {
  transform: rotateZ(90deg);
}

.arrow-empty {
  width: 25px;
  height: 25px;
}

a {
  text-decoration: underline;
}
</style>
