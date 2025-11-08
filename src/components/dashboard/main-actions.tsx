'use client';

import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useAccount } from "wagmi";

const GlassCard = (props: React.ComponentProps<typeof Card>) => (
    <Card {...props} className="border-border/50 bg-card/60 backdrop-blur-sm" />
);

// Mock data
const walletBalance = 1250.5;
const depositedBalance = 5000;

const DepositSchema = z.object({
  depositAmount: z.coerce
    .number()
    .positive({ message: "Amount must be greater than 0" })
    .max(walletBalance, { message: "Insufficient balance" }),
});

const WithdrawSchema = z.object({
  withdrawAmount: z.coerce
    .number()
    .positive({ message: "Amount must be greater than 0" })
    .max(depositedBalance, { message: "Amount exceeds deposited balance" }),
});


export function MainActions() {
  const { toast } = useToast();
  const [isApproving, setIsApproving] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [activeTab, setActiveTab] = useState("deposit");
  const { isConnected } = useAccount();
  
  const depositForm = useForm<z.infer<typeof DepositSchema>>({
    resolver: zodResolver(DepositSchema),
    mode: "onChange",
    defaultValues: {
      depositAmount: undefined,
    }
  });

  const withdrawForm = useForm<z.infer<typeof WithdrawSchema>>({
    resolver: zodResolver(WithdrawSchema),
    mode: "onChange",
    defaultValues: {
      withdrawAmount: undefined,
    }
  });

  const handleApprove = () => {
    setIsApproving(true);
    setTimeout(() => {
      setIsApproving(false);
      setIsApproved(true);
      toast({
        title: `Transaction Successful`,
        description: `Your approval was successful.`,
        variant: "default",
      });
    }, 2000);
  }

  const onDepositSubmit = (values: z.infer<typeof DepositSchema>) => {
    setIsDepositing(true);
    setTimeout(() => {
      setIsDepositing(false);
      toast({
        title: `Transaction Successful`,
        description: `Your deposit of ${values.depositAmount} ASSET was successful.`,
        variant: "default",
      });
      depositForm.reset();
      setIsApproved(false);
    }, 2000);
  };
  
  const onWithdrawSubmit = (values: z.infer<typeof WithdrawSchema>) => {
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      toast({
        title: `Transaction Successful`,
        description: `Your withdraw of ${values.withdrawAmount} ASSET was successful.`,
        variant: "default",
      });
      withdrawForm.reset();
    }, 2000);
  };

  if (!isConnected) {
    return (
      <GlassCard>
        <CardHeader>
          <CardTitle>Vault Actions</CardTitle>
          <CardDescription>
            Please connect your wallet to deposit or withdraw assets.
          </CardDescription>
        </CardHeader>
      </GlassCard>
    )
  }

  return (
    <GlassCard>
      <CardHeader>
        <CardTitle>Vault Actions</CardTitle>
        <CardDescription>
          Deposit your assets to start earning yield or withdraw your staked assets.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deposit">
              <ArrowDownToLine className="mr-2 h-4 w-4" /> Deposit
            </TabsTrigger>
            <TabsTrigger value="withdraw">
              <ArrowUpFromLine className="mr-2 h-4 w-4" /> Withdraw
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deposit" className="mt-4 space-y-4">
            <Form {...depositForm}>
              <form onSubmit={depositForm.handleSubmit(onDepositSubmit)} className="space-y-4">
                <FormField
                  control={depositForm.control}
                  name="depositAmount"
                  render={({ field }) => (
                    <FormItem>
                       <div className="flex justify-between items-center text-sm">
                        <FormLabel>Amount</FormLabel>
                        <span className="text-muted-foreground">Balance: {walletBalance.toFixed(2)} ASSET</span>
                      </div>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input
                            id="deposit-amount"
                            placeholder="0.0"
                            type="number"
                            step="any"
                            {...field}
                             onChange={(e) => field.onChange(e.target.value === '' ? undefined : e.target.value)}
                          />
                          <Button type="button" variant="outline" onClick={() => depositForm.setValue("depositAmount", walletBalance, { shouldValidate: true })}>Max</Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    disabled={isApproving || isApproved || !depositForm.formState.isValid}
                    onClick={handleApprove}
                  >
                    {isApproving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isApproved ? 'Approved' : '1. Approve'}
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isApproved || isDepositing || !depositForm.formState.isValid}
                  >
                    {isDepositing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    2. Deposit
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="withdraw" className="mt-4 space-y-4">
            <Form {...withdrawForm}>
              <form onSubmit={withdrawForm.handleSubmit(onWithdrawSubmit)} className="space-y-4">
                 <FormField
                  control={withdrawForm.control}
                  name="withdrawAmount"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center text-sm">
                        <FormLabel>Amount</FormLabel>
                        <span className="text-muted-foreground">Deposited: {depositedBalance.toFixed(2)} ASSET</span>
                      </div>
                      <FormControl>
                        <div className="flex gap-2">
                           <Input
                            id="withdraw-amount"
                            placeholder="0.0"
                            type="number"
                            step="any"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value === '' ? undefined : e.target.value)}
                          />
                          <Button type="button" variant="outline" onClick={() => withdrawForm.setValue("withdrawAmount", depositedBalance, { shouldValidate: true })}>Max</Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isWithdrawing || !withdrawForm.formState.isValid}
                >
                  {isWithdrawing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Withdraw
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </GlassCard>
  );
}
