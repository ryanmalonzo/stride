import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { CueCard } from "../../../components/ui/CueCard";
import { trpc } from "../../../lib/trpc";
import { OnboardingStepLayout } from "../components/OnboardingStepLayout";
import { useOnboardingNavigation } from "../hooks/useOnboardingNavigation";
import { useOnboardingStore } from "../store";

export function OnboardingReminderPage() {
	const { t } = useTranslation("onboarding");
	const { t: tMisc } = useTranslation("misc");
	const { goBack } = useOnboardingNavigation();
	const navigate = useNavigate();
	const { data, setData } = useOnboardingStore();
	const {
		selectedIdentityKeys,
		otherIdentity,
		selectedStruggleKeys,
		habitType,
		intention,
		stack,
		tinyVersion,
		reminder,
	} = data;

	const complete = trpc.onboarding.complete.useMutation({
		onSuccess: () => {
			navigate({ to: "/dashboard" });
		},
		onError: () => {
			toast.error(tMisc("genericError"));
		},
	});

	function handleContinue() {
		if (habitType === null) {
			return;
		}

		if (reminder === "browser") {
			Notification.requestPermission();
		}

		const identities = selectedIdentityKeys.map((key) =>
			key === "other" ? otherIdentity : t(`identity.options.${key}`),
		);
		const struggles = selectedStruggleKeys.map((key) =>
			t(`struggles.options.${key}`),
		);

		complete.mutate({
			identities,
			struggles,
			habit:
				habitType === "intention"
					? {
							type: "IMPLEMENTATION_INTENTION",
							name: intention.action,
							tinyVersion,
							time:
								intention.time === "other"
									? intention.otherTime
									: intention.time,
							location:
								intention.location === "other"
									? intention.otherLocation
									: intention.location,
						}
					: {
							type: "HABIT_STACK",
							name: stack.newHabit,
							tinyVersion,
							anchor: stack.anchor,
						},
		});
	}

	return (
		<OnboardingStepLayout
			title={t("reminder.title")}
			subtitle={t("reminder.subtitle")}
			onBack={goBack}
			onContinue={handleContinue}
			isContinueLoading={complete.isPending}
		>
			<div className="flex flex-col gap-2.5">
				<CueCard
					icon="🔔"
					title={t("reminder.options.browser.title")}
					description={t("reminder.options.browser.description")}
					selected={reminder === "browser"}
					onClick={() =>
						setData({ reminder: reminder === "browser" ? null : "browser" })
					}
					selectedLabel={t("reminder.selected")}
					recommended
					horizontal
				/>

				<CueCard
					icon="⚙️"
					title={t("reminder.options.advanced.title")}
					description={t("reminder.options.advanced.description")}
					selected={reminder === "advanced"}
					onClick={() =>
						setData({ reminder: reminder === "advanced" ? null : "advanced" })
					}
					selectedLabel={t("reminder.selected")}
					muted
					horizontal
				/>
			</div>
		</OnboardingStepLayout>
	);
}
