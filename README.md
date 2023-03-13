This is a demo project for the paper-embedded wallet service. The wrong way to use the SDK will cause the error when the user cancels the log in the first time and try to log in with the modal again.
This project uses Next.js.
Put your paper key into the .env.local like below

```
NEXT_PUBLIC_KEY=MY_KEY
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The two buttons indicate the two methods. See source code(pages/index.tsx) for more information.

