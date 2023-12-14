
const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export default {
  path: '/interview',
  name: 'interview',
  meta: { title: 'Interview', icon: 'user-fill' },
  redirect: '/interview/candidate',
  component: RouteView,
  children: [
    {
      path: 'candidate',
      name: 'interview-candidate',
      meta: { title: 'Candidate' },
      component: () => import('@/views/interview/Candidate')
    },
    {
      path: 'interview',
      name: 'interview-interview',
      meta: { title: 'Interview' },
      component: () => import('@/views/interview/Interview')
    },
    {
      path: 'position',
      name: 'interview-position',
      meta: { title: 'Position' },
      component: () => import('@/views/interview/Position')
    }

  ]
}
