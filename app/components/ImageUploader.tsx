import { Form } from "@remix-run/react";
import { useRef } from "react";
import { useActionData } from "@remix-run/react";

const ImageUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const actionData = useActionData<typeof action>();

  return (
    <>
      <Form
        method="post"
        encType="multipart/form-data"
        className="space-y-4"
      >
        <input
          type="file"
          name="image"
          ref={inputRef}
          accept="image/*"
          style={{ display: "none" }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="px-4 py-2  bg-blue-500 rounded hover:bg-blue-600"
        >
          Choose Image
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Upload Image
        </button>
      </Form>
      {actionData?.error && <p className="text-red-500">{actionData.error}</p>}
      {actionData?.message && (
        <p className="text-green-500">
          {actionData.message}: {actionData.path}
        </p>
      )}
    </>
  );
};

export { ImageUploader };


