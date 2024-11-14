import { tasks } from '@plugjs/build'

export default tasks({
  extraLint: [
    [ '**/*.vue', { directory: 'demo' } ],
    [ 'build.ts', { directory: '.' } ],
  ],
})
