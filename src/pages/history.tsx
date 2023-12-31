import Head from "next/head";
import Layout from "@/components/layout";

export default function HistoryPage() {
  return (
    <>
      <Head>
        <title>GPTask - History</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Prompt history and more coming soon!
          </h1>
        </div>
      </Layout>
    </>
  );
}
