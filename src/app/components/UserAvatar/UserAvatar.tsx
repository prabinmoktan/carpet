interface UserAvatarTypes {
  firstName?: string;
  lastName?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarTypes> = ({
  firstName,
  lastName,
  size = "md",
  className,
}) => {
  const initials = `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase() ;
  
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-xl",
  };

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        
        from-purple-500 to-blue-500
        flex items-center justify-center
        font-semibold text-white
        shadow-md
        border-2 border-white/20
        ${className}
      `}
    >
      {initials}
    </div>
  );
};
