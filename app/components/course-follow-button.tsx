export default function CourseFollowButton({
  documentId,
  fetcher
}: {
  documentId: string;
  fetcher: any;
}) {

  return <fetcher.Form
  method="POST"
  action="/api/follow"
>
  <fieldset disabled={false}>
    <input
      hidden
      name="documentId"
      defaultValue={documentId}
    />
    <button type="submit">{ fetcher.data?.isFollowed ? "Unfollow" : "Follow"}</button>
  </fieldset>
</fetcher.Form>
}