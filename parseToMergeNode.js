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
    "๐ ~ file: parseToMergeNode.js ~ line 32 ~ calculateNodesWidth ~ allNodes",
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
    "๐ ~ file: parseToMergeNode.js ~ line 39 ~ handleNodePosition ~ needToMergeNodesObj",
    needToMergeNodesObj
  );
  // 1. ่ฎก็ฎ้่ฆๅๅนถ็่็นๆๆๅ ็จ็ไฝ็ฝฎ
  //  1๏ผๆๅญ่็น
  //  2๏ผๆ ๅญ่็น

  const evenNodePosition =
    totalWidth / Number(Object.keys(needToMergeNodesObj).length);

  /**
   * 1.ๅญ่็นๅ้็็ฉบ้ด๏ผ้่ฆ็ป่ฟ้จๅ่ฎก็ฎ
   *  ๆฏๅฆ๏ผๆปๅฎฝๆฏ100px๏ผ
   *    1๏ผ2ไธช้่ฆๅๅนถ็ๅญ่็น๏ผๆ้ๅ้็็ฉบ้ด๏ผ25px๏ผ1/4๏ผใ 75px๏ผ3/4๏ผ
   *    2๏ผ3ไธช้่ฆๅๅนถ็ๅญ่็น๏ผๆ้่ฆๅ้็็ฉบ้ด๏ผ1/3 ใ 2/3 ใ 3/3
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
