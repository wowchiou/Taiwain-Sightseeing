const { prompt } = require('enquirer');
const fs = require('fs');
const path = require('path');

// 初始問題設定
const questions = [
  // 詢問元件名稱
  {
    type: 'input',
    name: 'componentName',
    message: 'component name:',
    validate: (input) => {
      if (input) {
        return true;
      }
      return 'component name is required!';
    },
  },
  // 詢問元件歸類
  {
    type: 'select',
    name: 'scope',
    message: 'component scope:',
    choices: ['components', 'layouts', 'views'],
    default: 'atom',
  },
];

// 獲取index.js模板
const getIndexContent = (componentName) => {
  try {
    const data = fs.readFileSync('./template/index.js', 'utf8');
    return data.toString().replace(/COMPONENT_NAME/g, componentName);
  } catch (error) {
    console.log('getComponentIndexContent error', error);
  }
};

// 獲取元件模板
const getComponentContent = (componentName) => {
  try {
    const data = fs.readFileSync('./template/component.vue', 'utf8');
    const componentClassName =
      componentName.charAt(0).toLowerCase() + componentName.slice(1);
    return data
      .toString()
      .replace(/COMPONENT_NAME/g, componentName)
      .replace(/COMPONENT_CLASS_NAME/g, componentClassName);
  } catch (error) {
    console.log('getComponentContent error', error);
  }
};

// 獲取scss模板
const getSassContent = (componentName) => {
  try {
    const data = fs.readFileSync('./template/component.scss', 'utf8');
    const componentClassName =
      componentName.charAt(0).toLowerCase() + componentName.slice(1);
    return data
      .toString()
      .replace(/COMPONENT_NAME/g, componentName)
      .replace(/COMPONENT_CLASS_NAME/g, componentClassName);
  } catch (error) {
    console.log('getComponentStyleContent error', error);
  }
};

// 獲取unit-test模板
const getUnitTestContent = (componentName) => {
  try {
    const data = fs.readFileSync('./template/component.spec.js', 'utf8');
    return data.toString().replace(/COMPONENT_NAME/g, componentName);
  } catch (error) {
    console.log('getComponentStyleContent error', error);
  }
};

// 獲取storybook模板
// const getStorybookContent = (componentName, scopeName) => {
//   try {
//     const data = fs.readFileSync(
//       './template/component/component.stories.js',
//       'utf8'
//     );
//     const componentScopeName = `${scopeName
//       .charAt(0)
//       .toUpperCase()}${scopeName.slice(1)}s`;
//     return data
//       .toString()
//       .replace(/COMPONENT_NAME/g, componentName)
//       .replace(/SCOPE_NAME/g, componentScopeName);
//   } catch (error) {
//     console.log('getComponentStoryContent error', error);
//   }
// };

// 創建資料夾
const createComponentFolder = async ({ name, scope }) => {
  console.log(scope);
  // 將元件名首字改成大寫
  const componentName = name.charAt(0).toUpperCase() + name.slice(1);

  // 設定元件歸屬資料夾路徑
  const scopeDestination = path.join(__dirname, 'src', scope);

  // 確認 scope 資料夾是否存在
  const scopeFolderExist = await fs.existsSync(scopeDestination);
  if (!scopeFolderExist) {
    fs.mkdir(scopeDestination, (err) => {
      if (err) throw new Error('創建 scope 資料夾錯誤');
    });
  }

  // 設定元件資料夾路徑
  const componentFolder = path.join(scopeDestination, componentName);
  console.log(componentFolder);

  // 確認元件資料夾是否存在
  const componentFolderExist = await fs.existsSync(componentFolder);
  if (componentFolderExist) {
    throw new Error(componentFolder + ' 已存在');
  }

  // create component dir 創建元件資料夾
  fs.mkdir(componentFolder, async (err) => {
    if (err) throw new Error('資料夾建立錯誤');
    // 在這邊做資料設定
    const files = {
      index: {
        path: `${componentFolder}/index.js`,
        getContent: () => getIndexContent(componentName),
      },
      component: {
        path: `${componentFolder}/${componentName}.vue`,
        getContent: () => getComponentContent(componentName),
      },
      sass: {
        path: `${componentFolder}/${componentName}.scss`,
        getContent: () => getSassContent(componentName),
      },
      // ['unit-test']: {
      //   path: `${componentFolder}/${componentName}.spec.js`,
      //   getContent: () => getUnitTestContent(componentName),
      // },
      //   storybook: {
      //     path: `${componentFolder}/${componentName}.stories.js`,
      //     getContent: () => getStorybookContent(componentName, scope),
      //   },
    };

    // 依序創建資料
    Object.keys(files).forEach(async (itm) => {
      const file = files[itm];
      const path = file.path;
      const content = await file.getContent();
      fs.writeFile(path, content, async (err) => {
        if (err) console.log(`COMPONENT_INDEX_FILE_EXIST: ${path}`);
        console.log(`Update ${path}`);
      });
    });
  });
};

const createComponent = async () => {
  // 提取使用者輸入的回覆
  const { componentName, scope } = await prompt(questions);
  // 創建資料
  createComponentFolder({ name: componentName, scope });
};

createComponent();
