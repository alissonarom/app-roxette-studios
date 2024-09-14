import React from "react";
import { View } from "react-native";
import { DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
// import { TextInput } from "react-native";
import { TextInput } from "react-native-paper";

export default function datePicker() {
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params: any) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );
// TODO alterar idioma e cores tema do calendário
  return (
    <SafeAreaProvider>
      <View>
        <TextInput
            style={{height: 30, borderBottomColor: '#145B91', backgroundColor: 'white' }}
            placeholder={`${date}`}
            onFocus={() => setOpen(true)}
        />
        <DatePickerModal
          disableStatusBarPadding
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
        />
      </View>
    </SafeAreaProvider>
  );
}