## ULESSON TELESALES AGENT PAY APP

App was built with Next.js and chakra-ui with built-in TypeScript.

We are connecting the Next.js `_app.js` with `chakra-ui`'s Provider and theme so the pages can have app-wide dark/light mode. 
We are also creating some components which shows the usage of `chakra-ui`'s style props.

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Notes

Chakra has supported Gradients and RTL in `v1.1`. To utilize RTL, [add RTL direction and swap](https://chakra-ui.com/docs/features/rtl-support).

If you don't have multi-direction app, you should make `<Html lang="ar" dir="rtl">` inside `_document.ts`.
