(()=> {
    const createButton = () => {
        // 第一层<span class="bp3-popover-wrapper group-reference-popover-wrapper">
        const popoverWrapper = document.createElement("span");
        popoverWrapper.className = "ec-plus bp3-popover-wrapper";
        // 第二层<span class="bp3-popover-target">
        const popoverTarget = document.createElement("span");
        popoverTarget.className = "bp3-popover-target";
        popoverWrapper.appendChild(popoverTarget);
        // 第三层<span class="bp3-button bp3-minimal bp3-small">
        const popoverButton = document.createElement("span");
        popoverButton.className = "bp3-button bp3-minimal bp3-small";
        popoverButton.tabIndex = 0;
        // 第四层-图标 <span class="bp3-icon bp3-icon-layers">
        const popoverIcon = document.createElement("span");
        popoverIcon.className = `bp3-icon bp3-icon-plus`;
        popoverButton.appendChild(popoverIcon);
        popoverTarget.appendChild(popoverButton);
      
        // 事件处理
        popoverButton.onclick = (e) => {
          window.roamAlphaAPI.createBlock({"location": 
          {"parent-uid": getTodayUid(), 
           "order": 0}, 
       "block": 
          {"string": "Card Title #[[" + getCurrentPageTitle() + "]]"}});
        };
      
        return popoverWrapper;
      };
      
      const getCurrentPageTitle = () => {
          let pageUID = window.location.href.split('/')[7];
          let pageTitle = window.roamAlphaAPI.q(`[:find ?title :where [?p :block/uid "${pageUID}"] [?p :node/title ?title]]`)[0][0];
          return pageTitle;
      }
      
      const getTodayUid = () => {
          let date = new Date();
          var pad = (n) => n.toString().padStart(2, "0");
          let uid = pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + "-" + date.getFullYear();
          return uid;
      }
      
      
      // 换页时保留按钮
      const observePageChange = () => {
          const pagemutationConfig = {subtree: true, childList: true};
          const pageTitleNode = document.getElementById("app");
          const observer = new MutationObserver(pageCallback);
          observer.observe(pageTitleNode, pagemutationConfig);
      }
      
      const pageCallback = (mutationList, observer) => {
          // 检查页面上是否已插入按钮
          const button = document.getElementsByClassName('ec-plus');
          if (button.length >= 1){
            return;
          }
          const insertContainer = document.getElementsByClassName('rm-reference-container dont-focus-block')[0];
          
          if (insertContainer === undefined){
            return;
          }
          const referenceContainer = document.getElementsByClassName('refs-by-page-view')[0];
          if (referenceContainer === undefined){
            return;
          }
          const buttonEle = createButton();
          insertContainer.insertAdjacentElement('beforebegin', buttonEle);
          const targetNode = document.getElementsByClassName('refs-by-page-view')[0];
          window.ReferencesGroup['observer'] = new MutationObserver(callBack);
          window.ReferencesGroup['observer'].observe(targetNode, mutationConfig);
        }
      const callBack = (mutationsList, observer) => {
      }
      
      window.ReferencesGroup = {};
      window.ReferencesGroup['State'] = '';
      const mutationConfig = {childList: true};
      observePageChange();
})()