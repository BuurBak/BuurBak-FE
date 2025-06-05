import Image from "next/image";

export function ProfilePicture(size = 44, profilePicture?: string) {
  return (
    <Image
      src={profilePicture || "/img/profielfoto.png"}
      alt="profiel foto"
      width={size}
      height={size}
    />
  );
}
