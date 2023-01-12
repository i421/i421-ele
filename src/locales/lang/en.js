/**
 * @description 项目英语配置
 */
export default {
  route: {
    home: 'Home',
    icons: 'Icons',
    components: 'Components',
    eleComponents: 'Element Components',
    charts: 'Charts',
    barChart: 'Bar',
    lineChart: 'Line',
    mixedChart: 'Other',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    dashboard: {
      dashboardPage: 'Dashboard',
      workbench: 'Workbench',
      analysis: 'Analysis',
    },
    system: {
      systemPage: 'System Manageant',
      dept: 'Dept Management',
      account: 'Account Management',
      role: 'Role Management',
      menu: 'Menu Management',
      log: 'Log Management',
      dict: 'Dict Management',
      password: 'Password Management',
    },
  },
  navbar: {
    logOut: 'Log Out',
    updatePassword: 'Update Password',
    oldPassword: 'old Password',
    newPassword: 'new Password',
    dashboard: 'Dashboard',
    github: 'Github',
    theme: 'Change theme',
    full: 'Full screen',
    noFull: 'Exit full screen',
    refresh: 'Refresh',
    fold: 'Fold',
    unfold: 'Unfold',
    size: 'Global Size',
    profile: 'Profile',
  },
  login: {
    title: 'Login',
    rules: {
      username: 'Please enter a username',
      password: 'Please enter your password',
    },
    loginBtn: 'Login',
    desc: 'Background management system',
    tip: 'Click login for a quick experience',
    username: 'Username',
    password: 'Password',
    thirdparty: 'Third-party Login',
    rememberPwd: 'Remember the password',
    forgotPwd: 'Forgot password',
  },
  register: {
    title: 'Register',
    registerBtn: 'Register',
    username: 'UserName',
    smsCode: 'SMS verification code',
    smsbtn: 'Get Code',
    password: 'Password',
    confirmPwd: 'Confirm Password',
    checkText: 'I agree with XXX Privacy Policy',
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.',
    loading: 'Theme change loading...',
    options: {
      theme1: 'Blue white',
      theme2: 'Blue black',
      theme3: 'Green white',
      theme4: 'Green black',
      theme5: 'Red white',
      theme6: 'Red black',
    },
  },
  tagsView: {
    refresh: 'Refresh',
    closeLeft: 'Close Left',
    closeRight: 'Close Right',
    closeOthers: 'Close Others',
    closeAll: 'Close All',
  },
  settings: {
    title: 'Theme Settings',
    layout: 'Layout',
    theme: 'Theme',
    menuBg: 'Menu Theme',
    logo: 'Logo',
    tag: 'Tag',
    breadcurmb: 'Breadcurmb',
    fixed: 'fixed Header',
    fullscreen: 'Fuscreen',
    refresh: 'Refresh',
    notice: 'Notice',
    defaultBtn: 'Restore the default',
    saveBtn: 'Save',
  },
  layout: {
    vertical: 'Vertical',
    horizontal: 'Horizontal',
  },
  sayHi: {
    early: 'Good early morning',
    morning: 'Good morning',
    noon: 'Good noon',
    afternoon: 'Good afternoon',
    evening: 'Good evening',
  },
  notice: {
    success: 'Success',
    msg: 'Welcome to ',
  },
  tabs: {
    notice: 'Notice',
    message: 'Message',
    email: 'EMail',
  },
  indexPage: {
    descTitle: 'Start your day!',
    resourceTitle: 'Vue3 related resources are recommended',
    orderTitle: 'The order list',
    order: {
      planned: 'Planned',
      finished: 'Completed',
      unfinished: 'Outstanding',
    },
    skillTitle: 'The skills list',
    envTitle: 'Production environments depend on information',
    chartTitle: 'Smoothed Line Chart',
  },
  errorPages: {
    title: 'Sorry!',
    btn: 'Back Home',
    404: {
      desc: 'Current page does not exist...',
      remark:
        'Please check whether the url you entered is correct, or click the button below to return to the home page',
    },
    401: {
      desc: "You don't have permission to go to this page...",
      remark:
        'Please contact the administrator or click the button below to return to the home page',
    },
  },
  echarts: {
    demo: 'Demo',
    line: {
      title: 'Line',
      demo1Title: 'Stacked area chart',
      demo2Title: 'Smoothed Line Chart',
      demo3Title: 'Stacked area chart',
    },
    bar: {
      title: 'Bar',
      demo1Title: 'Basic Bar',
      demo2Title: 'The amount of evaporation and precipitation in an area',
    },
    other: {
      title: 'Other Charts',
      demo1Title: 'Basic Candlestick',
      demo2Title: 'Basic Scatter Chart',
      demo3Title: 'Doughnut Chart with Rounded Corner',
      demo4Title: 'Basic Radar Chart',
      demo5Title: 'Simple Gauge',
      demo6Title: 'Funnel Chart',
    },
  },
  iconPage: {
    title: 'Icons',
    demo: 'Demo',
    props: 'Props',
    table: {
      label1: 'Params',
      label2: 'Type',
      label3: 'Options',
      label4: 'Default',
      label5: 'Descrition',
    },
  },
  element: {
    title: 'Element-Plus Demo',
    btn: 'Button',
    radio: 'Radio',
    checkBox: 'CheckBox',
    datePicker: 'DatePicker',
    dateTimePicker: 'DataTimePicker',
  },
  confirm: {
    title: 'Operating hints',
    msg: 'Are you sure you want to exit',
  },
  btn: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    add: 'Add',
    submit: 'Submit',
    reset: 'Reset',
    search: 'Search',
    show: 'Show',
    restart: 'Restart',
    download: 'download',
    help: 'Help',
    resolve: 'Resolve',
    back: 'Back',
    update: 'Update',
    delete: 'Delete',
  },
  modal: {
    input: {
      placeholder: 'Please Input',
    },
    title: {
      editAndStore: 'Edit&store',
      createAndStore: 'create&store',
    },
    confirm: {
      content: 'Are you sure you want to delete this data? ',
    },
    form: {
      require: 'require',
      errorFormat: 'format error',
      between0_999: 'must between 0-999',
      between4_20: 'must between 4-20',
      between2_20: 'must between 2-20',
      min4: 'min 4',
      max20: 'max 20',
    },
  },
  table: {
    seq: 'Seq',
    created: 'Created',
    updated: 'Updated',
    operation: 'Operation',
  },
  deptPage: {
    name: 'Name',
    remark: 'Remark',
    sort: 'sort',
    parentId: 'Parent',
    status: 'Status',
    statusList: {
      disable: 'Disable',
      enable: 'Enable',
    },
  },
  accountPage: {
    account: 'Account',
    nickname: 'Nickname',
    email: 'Email',
    role: 'Role',
    remark: 'Remark',
    password: 'Password',
    deptId: 'Dept',
    status: 'Status',
    statusList: {
      disable: 'Disable',
      enable: 'Enable',
    },
  },
  rolePage: {
    roleName: 'Name',
    value: 'Value',
    sort: 'Sort',
    description: 'Description',
    status: 'Status',
    statusList: {
      disable: 'Disable',
      enable: 'Enable',
    },
  },
  dictPage: {
    code: 'Code',
    c_key: 'key',
    value: 'Value',
    parentId: 'Parent',
    sort: 'Sort',
    remark: 'Remark',
  },
  logPage: {
    user_id: 'User ID',
    title: 'Title',
    operation: 'Operation',
    ip: 'IP',
  },
  menuPage: {
    icon: 'Icon',
    name: 'Name',
    status: 'Status',
    parentId: 'Parent',
    type: 'Type',
    path: 'Path',
    sort: 'Sort',
    configPerm: 'configPerm',
    typeList: {
      btn: 'Button',
      function: 'Menu',
      menu: 'Column',
    },
    statusList: {
      enable: 'Enable',
      disable: 'Disable',
    },
  },
};
