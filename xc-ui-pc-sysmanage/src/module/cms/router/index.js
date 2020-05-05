import Home from '@/module/home/page/home.vue';
import page_list from '@/module/cms/page/page_list.vue';
import page_add from '@/module/cms/page/page_add.vue';
import page_edit from '@/module/cms/page/page_edit.vue';
import page_template_list from '@/module/cms/template/page_template_list.vue';
import page_template_add from '@/module/cms/template/page_template_add.vue';
import page_template_edit from '@/module/cms/template/page_template_edit.vue';

export default [{
  path: '/',
  component: Home,
  name: 'CMS',//菜单名称
  hidden: false,
  children: [
    {path: '/cms/page/list', name: '页面列表', component: page_list, hidden: false},
    {path: '/cms/page/add', name: '新增页面', component: page_add, hidden: true},
    {path: '/cms/page/edit/:pageId', name: '修改页面', component: page_edit, hidden: true},
    {path: '/cms/template/list', name: '模板列表', component: page_template_list, hidden: false},
    {path: '/cms/template/add', name: '新增模板', component: page_template_add, hidden: true},
    {path: '/cms/template/edit/:pageId', name: '修改模板', component: page_template_edit, hidden: true}
  ]
}
]
