type PermissionList = string[] | string

export const validatePermissions = (
  requiredPermissions: PermissionList,
  userPermissions: PermissionList
):boolean => {

  /**
   * Make sure that we always work with list of strings
   */
  const userPermissionList = Array.isArray(userPermissions) ? userPermissions : [userPermissions];
  const requiredPermissionList = Array.isArray(requiredPermissions) ? requiredPermissions : [requiredPermissions];

  /**
   * Input validations
   */

  if(requiredPermissionList.length === 0){
    return false;
  }

  if(userPermissionList.filter((permission) => permission.trim().length === 0).length > 0){
    throw new Error('Invalid user permissions');
  }

  if(requiredPermissionList.filter((permission) => permission.trim().length === 0).length > 0){
    throw new Error('Invalid required permissions');
  }


  /**
   * Special permissions, owner and admin, always have access
   * to all required permissions
   */
  if(userPermissionList.includes("owner")){
    return true
  }

  if (userPermissionList.includes("admin")) {
    return true
  }


  /**
   * We check if the user has access to all required permissions,
   * one at the time.
   */
  for(const requiredPermission of requiredPermissionList){
    if(!doesUserHaveAccessToSinglePermission(userPermissionList, requiredPermission)){
      return false;
    }
  }

  return true;
}


const doesUserHaveAccessToSinglePermission = (userPermissions: string[], requiredPermission: string): boolean => {
  /**
   * Can we find the specific required permission in
   * the list of user permissions? If so, return true
   * right away. (perfect match)
   */
  if(userPermissions.includes(requiredPermission)){
    return true;
  }

  /**
   * We do not have a perfect match, so let's check if
   * there is any user permission that give access to
   * the required permission. To do so, we check if the
   * required permission (ie: object:action) starts with
   * the user permission (ie: object). If so, we can assume
   * that the user has access to the required permission
   * and return true.
   */
  for(const userPermission of userPermissions){
    if(requiredPermission.startsWith(`${userPermission}:`)){  
      return true;
    }
  }

  /**
   * In any other cases, we return false since the user is
   * not having access to the required permission.
   */
  return false;
}
