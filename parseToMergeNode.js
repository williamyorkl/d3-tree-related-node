function parseNeedToMergeTree(nodesData) {
  const allNodes = nodesData.descendants();
  const needToMergeNodeMap = {};

  const needToMergeNodeIdList = [];

  allNodes.forEach((node) => {
    if (node.data.mergeId) {
      if (needToMergeNodeIdList.indexOf(node.data.mergeId) === -1) {
        needToMergeNodeMap[node.data.mergeId] = [];
      }
      needToMergeNodeMap[node.data.mergeId].push(node);

      needToMergeNodeIdList.push(node.data.mergeId);
    }
  });

  return needToMergeNodeMap;

  // console.log("needToMergeNodeList", needToMergeNodeMap);
  /**
   * 
      223344: (2) [Node, Node]
      556677: (2) [Node, Node]
      [[Prototype]]: Object
   * 
   */
}

function calculateNodesWidth(nodesData) {
  const allNodes = nodesData.descendants();
  console.log(
    "🚀 ~ file: parseToMergeNode.js ~ line 32 ~ calculateNodesWidth ~ allNodes",
    allNodes
  );
  const allNodeXList = allNodes.map((node) => node.x);

  const minNodeX = Math.min(...allNodeXList);
  const maxNodeX = Math.max(...allNodeXList);

  // return Number(maxNodeX) - Number(minNodeX);
  return Number(maxNodeX);
}

function centerNodeX(nodesData) {
  return Number(nodesData.descendants()[0].x);
}

function handleNodePosition(needToMergeNodesObj, totalWidth) {
  console.log(
    "🚀 ~ file: parseToMergeNode.js ~ line 39 ~ handleNodePosition ~ needToMergeNodesObj",
    needToMergeNodesObj
  );
  // 1. 计算需要合并的节点所有占用的位置
  //  1）有子节点
  //  2）无子节点

  const evenNodePosition =
    totalWidth / Number(Object.keys(needToMergeNodesObj).length);

  /**
   * 1.子节点分配的空间：需要经过部分计算
   *  比如：总宽是100px，
   *    1）2个需要合并的子节点，所需分配的空间：25px（1/4）、 75px（3/4）
   *    2）3个需要合并的子节点，所需要分配的空间：1/3 、 2/3 、 3/3
   */
  const nodeXTargetList = [totalWidth / 4, (totalWidth * 3) / 4];

  Object.keys(needToMergeNodesObj).forEach((key, index1) => {
    const nodeList = needToMergeNodesObj[key];
    nodeList.forEach((node, index) => {
      node.x = nodeXTargetList[index1];
    });
  });

  return needToMergeNodesObj;
}
