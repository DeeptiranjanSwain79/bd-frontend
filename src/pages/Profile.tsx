import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AuthWrapper from "../components/wrapper/AuthWrapper";
import { AuthContext, AuthContextType } from "../contexts/contexts";
import { useCallback, useContext, useEffect, useState } from "react";
import { PrivateAPI } from "../api/client";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface UserProfile {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  targetAmount?: number | null;
  role: string;
  incomeCategories: string[];
  expenseCategories: string[];
  investmentCategories: string[];
}

const Profile = () => {
  const { setActiveState } = useContext(AuthContext) as AuthContextType;
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  const getMyProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data, status }: { data: any; status: number } =
        await PrivateAPI.get("/auth/me");
      if (status === 200 && data?.user) {
        setUserData(data.user);
        setFormData(data.user);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (
    type: "incomeCategories" | "expenseCategories" | "investmentCategories",
    index: number,
    value: string
  ) => {
    const formatted = value.toUpperCase().replace(/\s+/g, "_");
    setFormData((prev) => {
      const updated = [...(prev[type] || [])];
      updated[index] = formatted;
      return { ...prev, [type]: updated };
    });
  };

  const handleAddCategory = (
    type: "incomeCategories" | "expenseCategories" | "investmentCategories"
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type]: [...(prev[type] || []), ""],
    }));
  };

  const handleRemoveCategory = (
    type: "incomeCategories" | "expenseCategories" | "investmentCategories",
    index: number
  ) => {
    setFormData((prev) => {
      const updated = [...(prev[type] || [])];
      updated.splice(index, 1);
      return { ...prev, [type]: updated };
    });
  };

  const validateCategories = (arr: string[] = []) => {
    const filtered = arr
      .map((a) => a.trim())
      .filter(Boolean)
      .map((a) => a.toUpperCase().replace(/\s+/g, "_"));
    return [...new Set(filtered)];
  };

  const handleSubmit = async () => {
    if (!userData?._id) return;
    try {
      setLoading(true);

      const payload = {
        ...formData,
        incomeCategories: validateCategories(formData.incomeCategories),
        expenseCategories: validateCategories(formData.expenseCategories),
        investmentCategories: validateCategories(formData.investmentCategories),
      };
      console.log(payload);
      const { data, status }: { data: any; status: number } =
        await PrivateAPI.put(`/api/users/${userData._id}`, payload);

      if (status === 200 && data?.user) {
        setUserData(data.user);
        setFormData(data.user);
        if (data?.userObj) {
          localStorage.setItem("user", JSON.stringify(data.userObj));
        }
        setEditing(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setActiveState("profile");
    getMyProfile();
  }, [getMyProfile, setActiveState]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AuthWrapper>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          maxWidth: 900,
          mx: "auto",
        }}
      >
        {!editing ? (
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Profile Overview
            </Typography>

            {userData && (
              <Box sx={{ mt: 2, display: "grid", gap: 1 }}>
                <Typography>
                  <strong>Name:</strong> {userData.name}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {userData.email}
                </Typography>
                <Typography>
                  <strong>Phone:</strong> {userData.phone}
                </Typography>
                <Typography>
                  <strong>Role:</strong> {userData.role}
                </Typography>
                <Box mt={2}>
                  <Typography variant="h6" gutterBottom>
                    Categories
                  </Typography>
                  <Typography>
                    <strong>Income:</strong>{" "}
                    {userData.incomeCategories.join(", ")}
                  </Typography>
                  <Typography>
                    <strong>Expense:</strong>{" "}
                    {userData.expenseCategories.join(", ")}
                  </Typography>
                  <Typography>
                    <strong>Investment:</strong>{" "}
                    {userData.investmentCategories.join(", ")}
                  </Typography>
                </Box>
              </Box>
            )}

            <Button
              variant="contained"
              sx={{ mt: 4, px: 4, borderRadius: 2 }}
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Edit Profile
            </Typography>

            {/* Basic Info */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2,
                mb: 3,
              }}
            >
              <TextField
                label="Name"
                name="name"
                fullWidth
                value={formData.name || ""}
                onChange={handleInputChange}
              />
              <TextField
                label="Phone"
                name="phone"
                fullWidth
                value={formData.phone || ""}
                onChange={handleInputChange}
              />
              <TextField
                label="Target Amount"
                name="targetAmount"
                type="number"
                fullWidth
                value={formData.targetAmount || ""}
                onChange={handleInputChange}
              />
            </Box>

            {/* Category Sections */}
            {[
              "incomeCategories",
              "expenseCategories",
              "investmentCategories",
            ].map((type) => (
              <Paper
                key={type}
                elevation={1}
                sx={{
                  p: 2,
                  mb: 3,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{ mb: 1, fontWeight: "600" }}>
                  {type.replace("Categories", "")} Categories
                </Typography>

                <Box sx={{ display: "grid", gap: 1 }}>
                  {(formData[type as keyof UserProfile] as string[])?.map(
                    (cat, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr auto",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <TextField
                          fullWidth
                          value={cat}
                          onChange={(e) =>
                            handleCategoryChange(type as any, i, e.target.value)
                          }
                        />
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveCategory(type as any, i)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    )
                  )}
                </Box>

                <Button
                  size="small"
                  variant="contained"
                  fullWidth
                  startIcon={<AddIcon />}
                  sx={{ my: 2 }}
                  onClick={() => handleAddCategory(type as any)}
                >
                  Add Category
                </Button>
              </Paper>
            ))}

            {/* Actions */}
            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Save Changes
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </AuthWrapper>
  );
};

export default Profile;
