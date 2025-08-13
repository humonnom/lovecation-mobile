import * as React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { User } from "../../types";
import { UserCard } from "./UserCard";

interface UserGridProps {
  users: User[];
}

export const UserGrid = ({ users }: UserGridProps) => {
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.userGrid}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  userGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
});
