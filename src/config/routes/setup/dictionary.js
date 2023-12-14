export default {
  path: 'dictionary',
  name: 'setup-dictionary',
  meta: { title: 'Dictionary', icon: 'user' },
  component: () => import('@/views/setup/dictionary/List')
}
