"use server";

export const updateUserRole = async (
  userId: string,
  beforeUpdate: string[],
  afterUpdate: string[]
): Promise<{success: boolean, message: string}> => {
  const rolesToRemove = beforeUpdate.filter(
    (role) => !afterUpdate.includes(role) && role !== "customer"
  );
  const rolesToAssign = afterUpdate.filter(
    (role) => !beforeUpdate.includes(role)
  );


  try {
    // Handle role assignments
    const assignPromises = rolesToAssign.map((role) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/user-roles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            user_id: userId,
            role: role,
        }),
      })
    );

    // Handle role removals
    const removePromises = rolesToRemove.map((role) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/user-roles`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            user_id: userId,
            role: role,
        }),
      })
    );

    // Wait for all promises to resolve
    const results = await Promise.all([...assignPromises, ...removePromises]);

    
    results.forEach((result, index) => {
      if (!result.ok) {
        throw new Error(`Error with request #${index + 1}: ${result.statusText}`);
      }
    });
    console.log("Role updates completed.");
    return {success: true, message: "Role updates completed."}
  } catch (error) {
    return {success: false, message: (error as Error).message}
  }
};
