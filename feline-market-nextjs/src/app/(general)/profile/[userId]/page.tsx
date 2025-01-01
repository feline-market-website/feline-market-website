import UpdateProfileForm from "@/components/user-profile/UpdateProfileForm";

export default async function Profile({
    params,
}: {
    params: Promise<{ userId: string }>;
}) {

    const paramsData = await params;
    const userId = paramsData.userId;
    console.log(userId);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/user-profiles/${userId}/user-id`, {
        method: "GET",
        credentials: "include"
    })
    const responseJson = await response.json()
    console.log(responseJson.data)
    return (
        <div>
            <UpdateProfileForm userProfile={responseJson.data} />
        </div>
    );
}
