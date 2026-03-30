import { Avatar, Button, Stack, TextField, Typography } from "@mui/material";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import { useGlobals } from "../../hooks/useGlobals";
import { MemberUpdateInput } from "../../../lib/types/member";
import { useState } from "react";
import { T } from "../../../lib/types/common";
import { Messages, serverApi } from "../../../lib/config";
import MemberService from "../../services/MemberService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import {
  alphaZoneColors,
  alphaZoneInputSx,
} from "../../../lib/alphaZone";

export function Settings() {
  const { authMember, setAuthMember } = useGlobals();
  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage
      ? `${serverApi}/${authMember.memberImage}`
      : "/icons/default-user.svg",
  );
  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>({
    memberNick: authMember?.memberNick,
    memberPhone: authMember?.memberPhone,
    memberAddress: authMember?.memberAddress,
    memberDesc: authMember?.memberDesc,
    memberImage: authMember?.memberImage,
  });

  const memberNickHandler = (e: T) => {
    setMemberUpdateInput((prev) => ({ ...prev, memberNick: e.target.value }));
  };

  const memberPhoneHandler = (e: T) => {
    setMemberUpdateInput((prev) => ({ ...prev, memberPhone: e.target.value }));
  };

  const memberAddressHandler = (e: T) => {
    setMemberUpdateInput((prev) => ({ ...prev, memberAddress: e.target.value }));
  };

  const memberDescriptionHandler = (e: T) => {
    setMemberUpdateInput((prev) => ({ ...prev, memberDesc: e.target.value }));
  };

  const handleSubmitButton = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (
        memberUpdateInput.memberNick === "" ||
        memberUpdateInput.memberPhone === "" ||
        memberUpdateInput.memberAddress === "" ||
        memberUpdateInput.memberDesc === ""
      ) {
        throw new Error(Messages.erorr3);
      }

      const member = new MemberService();
      const result = await member.updateMember(memberUpdateInput);
      setAuthMember(result);

      await sweetTopSmallSuccessAlert("Modified successfully!", 700);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handleImageViewer = (e: T) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = file.type;
    const validateImageTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (!validateImageTypes.includes(fileType)) {
      sweetErrorHandling(Messages.error5).then();
    } else {
      setMemberUpdateInput((prev) => ({ ...prev, memberImage: file }));
      setMemberImage(URL.createObjectURL(file));
    }
  };

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2.5}
        alignItems={{ xs: "flex-start", md: "center" }}
      >
        <Avatar
          src={memberImage}
          sx={{
            width: 100,
            height: 100,
            borderRadius: "28px",
            boxShadow: "0 18px 38px rgba(69,123,157,0.14)",
          }}
        />

        <Stack spacing={1}>
          <Typography
            sx={{
              color: alphaZoneColors.ink,
              fontWeight: 700,
              fontSize: "1.15rem",
            }}
          >
            Update your profile image
          </Typography>
          <Typography
            sx={{
              color: alphaZoneColors.slate,
              lineHeight: 1.7,
              fontSize: "0.92rem",
            }}
          >
            Upload JPG, JPEG, or PNG to keep your Alpha Zone dashboard fresh.
          </Typography>
          <Button
            component="label"
            startIcon={<CloudUploadRoundedIcon />}
            sx={{
              alignSelf: "flex-start",
              color: alphaZoneColors.ink,
              backgroundColor: alphaZoneColors.mint,
              "&:hover": {
                backgroundColor: alphaZoneColors.mintStrong,
              },
            }}
          >
            Upload image
            <input type="file" hidden onChange={handleImageViewer} />
          </Button>
        </Stack>
      </Stack>

      <TextField
        label="Username"
        value={memberUpdateInput.memberNick ?? ""}
        placeholder={authMember?.memberNick}
        onChange={memberNickHandler}
        fullWidth
        sx={alphaZoneInputSx}
      />

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField
          label="Phone"
          value={memberUpdateInput.memberPhone ?? ""}
          placeholder={authMember?.memberPhone ?? "no phone number"}
          onChange={memberPhoneHandler}
          fullWidth
          sx={alphaZoneInputSx}
        />
        <TextField
          label="Address"
          value={memberUpdateInput.memberAddress ?? ""}
          placeholder={authMember?.memberAddress ?? "no member address"}
          onChange={memberAddressHandler}
          fullWidth
          sx={alphaZoneInputSx}
        />
      </Stack>

      <TextField
        label="Description"
        value={memberUpdateInput.memberDesc ?? ""}
        placeholder={authMember?.memberDesc ?? "no member description"}
        onChange={memberDescriptionHandler}
        fullWidth
        multiline
        minRows={5}
        sx={alphaZoneInputSx}
      />

      <Button
        variant="contained"
        onClick={handleSubmitButton}
        sx={{
          alignSelf: "flex-start",
          color: alphaZoneColors.ink,
          backgroundColor: alphaZoneColors.mint,
          "&:hover": {
            backgroundColor: alphaZoneColors.mintStrong,
          },
        }}
      >
        Save Changes
      </Button>
    </Stack>
  );
}
