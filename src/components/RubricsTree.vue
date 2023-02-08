<template>
  <div>
    <div class="item-name">Tree root {{ tree.checkedCount / tree.count ?? "" }}</div>
    <input type="checkbox" class="select-checkbox" v-model="tree.selected" />
    <div class="item-children">
      <TreeRow
        v-for="row in tree.children"
        :key="row.id"
        :row="row"
        @select="selectTreeRow"
      />
    </div>
    <input type="checkbox" class="empty-checkbox" v-model="allowEmptyChecked" />
  </div>
</template>

<script>
const requestUrl = "http://localhost:8081/rubrics";
import TreeRow from "./TreeRow";
export default {
  name: "RubricsTree",
  components: {
    TreeRow,
  },
  data() {
    return {
      tree: {
        checkedCount: 0,
        count: undefined,
        children: [],
      },
      allowEmptyChecked: false,
    };
  },
  methods: {
    async getTreeData() {
      const urlParams = this.allowEmptyChecked ? "?allowEmpty=1" : "";
      const responseData = await fetch(`${requestUrl}${urlParams}`)
        .then((resp) => resp.json())
        .catch((resp) => {
          return [];
        });
      this.tree.children = responseData;
    },
    selectTreeRow(selectedNode) {
      this.tree.children.map((node) => this.selectNode(node, { selectedNode }));
      this.tree.children = [...this.tree.children];
    },
    selectNode(currentNode, action) {
      const { selectedNode, newValue } = action;

      if (newValue != undefined) {
        currentNode.selected = newValue;
        currentNode.children = (currentNode.children ?? []).map((node) =>
          this.selectNode(node, {
            selectedNode,
            newValue: currentNode.selected,
          })
        );
      } else if (currentNode == selectedNode) {
        currentNode.selected = !currentNode.selected;
        currentNode.children = (currentNode.children ?? []).map((node) =>
          this.selectNode(node, {
            selectedNode,
            newValue: currentNode.selected,
          })
        );
      } else {
        currentNode.children = (currentNode.children ?? []).map((node) =>
          this.selectNode(node, action)
        );
      }

      return { ...currentNode };
    },
  },
  watch: {
    allowEmptyChecked(newValue, oldValue) {
      if (newValue != oldValue) {
        this.getTreeData();
      }
    },
  },
  beforeMount() {
    this.getTreeData();
  },
};
</script>

<style scoped>
.item-children {
  padding-left: 15px;
}
</style>
