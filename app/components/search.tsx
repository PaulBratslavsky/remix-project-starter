import { useEffect } from "react";

import {
  useNavigation,
  useSubmit,
  Form,
} from "@remix-run/react";

import { Input } from "~/components/ui/input";


export function Search({ query }: { readonly query: string }) {
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("query");

  useEffect(() => {
    const searchField = document.getElementById("query");
    if (searchField instanceof HTMLInputElement) searchField.value = query ?? "";
  }, [query]);

  return (
    <div className="w-full">
    <Form
      id="search-form"
      role="search"
      onChange={(event) => {
        const isFirstSearch = query === null;
        submit(event.currentTarget, {
          replace: !isFirstSearch,
        });
      }}
    >
      <Input
        id="query"
        className={searching ? "loading" : ""}
        aria-label="Search contacts"
        placeholder="Search"
        type="search"
        name="query"
        defaultValue={query ?? ""}
      />
      <div id="search-spinner" aria-hidden hidden={!searching} />
    </Form>
  </div>
  );
}